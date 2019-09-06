"use strict";

module.exports = {
    listenPort: process.env.LISTEN_PORT || 9070,
    listenHost: process.env.LISTEN_HOST || '127.0.0.1',
    databaseUrl: process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/rent-collector'
};