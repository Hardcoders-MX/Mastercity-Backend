const debug = require('debug');

const config = require('../config');

const info = debug(`${config.srv.logPrefix}:info`);
const dev = debug(`${config.srv.logPrefix}:dev`);
const error = debug(`${config.srv.logPrefix}:error`);

module.exports = {
  info,
  dev,
  error,
};
