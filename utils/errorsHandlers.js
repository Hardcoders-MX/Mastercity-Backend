const Sentry = require('@sentry/node');
const debug = require('debug')('app:error');
const config = require('../config');

const {
  sentryDns,
} = config.sentry;

if (config.srv.mode === 'production') {
    Sentry.init({ dsn: sentryDns });
}

function logErrors(err, req, res, next) {
  if (config.srv.mode === 'production') Sentry.captureException(err);
  debug(err.stack);
  next(err);
}

module.exports = {
  logErrors,
};
