const Sentry = require('@sentry/node');
const debug = require('debug')('app:error');
const config = require('../config');

const {
  sentryDns,
} = config.sentry;

Sentry.init({ dsn: sentryDns });

function logErrors(err, req, res, next) {
  Sentry.captureException(err);
  debug(err.stack);
  next(err);
}

module.exports = {
  logErrors,
};
