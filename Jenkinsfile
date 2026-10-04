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
            }
        }

        stage('Verification') {
            steps {
                echo 'Verifying application deployment'
            }
        }
    }
}
