'use strict';
let mapSessions = {};

module.exports = {
    set(key, val) {
        mapSessions[key] = val;
    },

    get(key) {
        return mapSessions[key];
    },

    delete(key) {
        delete mapSessions[key];
    },
}