const Sentry = require('@sentry/node');
const debug = require("debug")("app:error");
const config = require('../config');

const {
  sentryDns,
  sentryId,
} = config.sentry;

Sentry.init({ dsn: `https://${sentryDns}@o361676.ingest.sentry.io/${sentryId}` });

function logErrors(err, req, res, next) {
  Sentry.captureException(err);
  debug(err.stack);
  next(err);
}

module.exports = {
  logErrors,
};
