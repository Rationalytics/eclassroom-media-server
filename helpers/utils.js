'use strict';
const keys = require('../config/keys');

module.exports = {
    getBasicAuth() {
        return 'Basic ' + (new Buffer('OPENVIDUAPP:' + keys.openViduSecret).toString('base64'));
    }
}