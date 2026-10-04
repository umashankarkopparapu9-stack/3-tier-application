const http = require('http');

const req = http.get('http://localhost:3000', (res) => {
    if (res.statusCode === 200) {
        console.log('Backend test passed');
        process.exit(0);
    } else {
        console.log(`Backend test failed: HTTP ${res.statusCode}`);
        process.exit(1);
    }
});

req.on('error', (error) => {
    console.log(`Backend test failed: ${error.message}`);
    process.exit(1);
});
