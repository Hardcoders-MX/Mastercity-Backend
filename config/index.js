require('dotenv').config();

const config = {
    srv: {
        mode: process.env.NODE_ENV || 'devlopment',
        port: process.env.PORT || 3000,
    },
    db: {},
};

module.exports = config;
