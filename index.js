const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const router = require('./router');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

const server = http.createServer(app);

server.listen(config.port, () => {
    console.log(`Server listening on ${config.port}`);
});

process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err.stack);

    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection', err);

    process.exit(1);
});

process.on('SIGINT', async () => {
    console.log('User Termination');

    if (server) {
        console.log('Stopping express server')
        server.close();
    }
    process.exit(0);
});
