'use strict';
const express = require('express');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const https = require('https');
const logger = require('morgan');
const bodyParser = require('body-parser'); // Pull information from HTML POST (express4)
const app = express(); // Create our app with express

const keys = require('./config/keys');
const authRouter = require('./routes/auth');
const lectureRouter = require('./routes/lectures');

const wsServer = require('./services/wsServer');

// Server configuration
app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: keys.openViduSecret
}));

app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // Parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // Parse application/vnd.api+json as json

app.use(cors());
app.use(logger('dev'));

// Listen (start app with node server.js)
const options = {
    key: process.env.NODE_ENV === 'dev' ? fs.readFileSync('./certs/openvidukey.pem') : fs.readFileSync('./certs/privateKey-rsa.key'),
    cert: process.env.NODE_ENV === 'dev' ? fs.readFileSync('./certs/openviducert.pem') : fs.readFileSync('./certs/publicKey.crt')
};

const server = https.createServer(options, app).listen(5000);
wsServer.startWebSocketServer(server);


/* REST API */
app.use('/auth', authRouter);
app.use('/lectures', lectureRouter);

app.use(function(err, req, res, next) {
    // send the error response
    console.error(err);
    res.status(err.status || 500).json({ message: 'Something went wrong with the server.' });
});

console.log('Listening on port ' + 5000 + ' in ' + process.env.NODE_ENV);
