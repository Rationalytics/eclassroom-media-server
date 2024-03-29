'use strict';

const redis = require('redis');
const util = require('util');

const keys = require('../config/keys');
let client = null;

if (process.env.NODE_ENV === 'ci') {
    client = redis.createClient(keys.redisUrl, { db: 'meraclass', password: keys.redisPassword });
} else if (process.env.NODE_ENV === 'demo') {
    client = redis.createClient(keys.redisUrl, { db: 'meraclass', password: keys.redisPassword });
} else if (process.env.NODE_ENV === 'prod') {
    client = redis.createClient(keys.redisUrl, { password: keys.redisPassword });
} else if (process.env.NODE_ENV === 'dev') {
    client = redis.createClient(keys.redisUrl);
}


client.hget = util.promisify(client.hget);
client.hset = util.promisify(client.hset);

module.exports = {

    /**
     * @description Adds an entry to a collection, e.g. `users` with the following key and value.
     * @param {string} lectureId 
     * @param {string} lectureSessionId 
     * @param {Object} value 
     */
    async set(lectureId, userId, value, duration) {
        try {
            let expiry = duration * 60; // set default expiry to 30 minutes
            await client.hset(lectureId, userId, value, 'EX', expiry);

            return true;
        } catch(err) {
            console.error(err);

            return false;
        }
    },


    /**
     * @description Retrieves an entry from a collection with the specified `key`.
     * @param {string} collection 
     * @param {string} key 
     */
    async get(collection, key) {
        try {
            const entry = await client.hget(collection, key);
            return JSON.parse(entry);
        } catch(err) {
            console.error(err);
            return null;
        }
    },
    

    /**
     * @description Deletes an entry from a collection with the specified `key`.
     * @param {string} collection 
     * @param {string} key 
     */
    delete(collection, key) {
        client.del(collection, key);
    },
  
    /**
     * @description Drops a complete collection.
     * @param {string} collection  
     */
    clearAll(collection) {
        client.del(collection);
    }
}