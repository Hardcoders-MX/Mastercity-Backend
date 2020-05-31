const express = require('express');
const passport = require('passport');
const InterestedController = require('./controller');
const isOfThisType = require('../../utils/middleware/isOfThisType');

const { Router } = express;

const myMiddlewares = {
  passport,
  isOfThisType,
};

require('../auth/strategies/jwt');

class InterestedRouter extends Router {
  constructor(app = false, controller, middlewares) {
    super();
    this.controller = controller;
    this.middlewares = middlewares;
    if (app !== false) {
      app.use('/api/interested', this);
    }

    this.get(
      '/',
      this.middlewares.passport.authenticate('jwt', { session: false }),
      this.middlewares.isOfThisType(['offerer']),
      this.controller.index,
    );

    this.post(
      '/',
      this.middlewares.passport.authenticate('jwt', { session: false }),
      this.middlewares.isOfThisType(['applicant']),
      this.controller.create,
    );

    this.delete(
      '/:id',
      this.middlewares.passport.authenticate('jwt', { session: false }),
      this.middlewares.isOfThisType(['applicant']),
      this.controller.destroy,
    );
  }
}

const interestedRouter = new InterestedRouter(false, new InterestedController(), myMiddlewares);

module.exports = {
  InterestedRouter,
  interestedRouter,
};
