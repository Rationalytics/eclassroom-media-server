'use strict';
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level.toUpperCase()}: ${message}`;
});

const logger = createLogger({
    level: 'debug',
    format: combine(
        label({ label: 'LECTURE_SESSION' }),
        timestamp(),
        myFormat
    ),
    transports: [new transports.Console()]
});

module.exports = logger;