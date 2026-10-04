pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/umashankarkopparapu9-stack/3-tier-application.git'
            }
        }

        stage('Frontend Build') {
            steps {
                echo 'Building Frontend Application'
                sh 'test -f frontend/index.html'
                sh 'echo "Frontend build completed"'
            }
        }

        stage('Backend Build') {
            steps {
                echo 'Building Backend Application'
                sh 'cd backend && npm install'
                sh 'node --check backend/app.js'
                sh 'echo "Backend build completed"'
            }
        }

        stage('Test') {
            steps {
                echo 'Running application tests'

                sh '''
                    cd backend
                    node app.js > test-server.log 2>&1 &
                    SERVER_PID=$!
                    sleep 2
                    node test.js
                    TEST_STATUS=$?
                    kill $SERVER_PID || true
                    exit $TEST_STATUS
                '''
            }
        }

        stage('Deployment') {
            steps {
                echo 'Deploying application'

                sh '''
                    export JENKINS_NODE_COOKIE=dontKillMe

                    if [ -f frontend.pid ] && kill -0 "$(cat frontend.pid)" 2>/dev/null; then
                        kill "$(cat frontend.pid)" || true
                        sleep 1
                    fi

                    if [ -f backend.pid ] && kill -0 "$(cat backend.pid)" 2>/dev/null; then
                        kill "$(cat backend.pid)" || true
                        sleep 1
                    fi

                    nohup python3 -m http.server 8081 --directory frontend > frontend.log 2>&1 &
                    echo $! > frontend.pid

                    nohup node backend/app.js > backend.log 2>&1 &
                    echo $! > backend.pid

                    sleep 2

                    echo "Frontend deployed on port 8081"
                    echo "Backend deployed on port 3000"
                '''
            }
        }

        stage('Verification') {
            steps {
                echo 'Verifying application deployment'

                sh '''
                    echo "Checking frontend..."
                    curl -f http://localhost:8081

                    echo ""
                    echo "Checking backend..."
                    curl -f http://localhost:3000

                    echo ""
                    echo "Application verification successful"
                '''
            }
        }
    }
}
