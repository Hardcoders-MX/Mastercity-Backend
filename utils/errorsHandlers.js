const Sentry = require('@sentry/node');
const boom = require('@hapi/boom');
const debug = require('debug')('app:error');
const config = require('../config');

const {
  sentryDns,
} = config.sentry;

if (config.srv.mode === 'production') {
  Sentry.init({ dsn: sentryDns });
}

function withErrorStack(error, stack) {
  if (config.srv.mode) {
    return { ...error, stack };
  }

  return error;
}

function logErrors(err, req, res, next) {
  if (config.srv.mode === 'production') Sentry.captureException(err);
  debug(err.stack);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err;
  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler,
};
