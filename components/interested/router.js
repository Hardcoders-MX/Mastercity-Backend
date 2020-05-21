const express = require('express');
const passport = require('passport');
const InterestedController = require('./controller');
const isOfThisType = require('../../utils/middleware/isOfThisType');

const { Router } = express;

require('../auth/strategies/jwt');

class InterestedRouter extends Router {
  constructor(app = false, controller = new InterestedController()) {
    super();
    this.controller = controller;
    if (app !== false) {
      app.use('/api/interested', this);
    }

    this.get(
      '/',
      passport.authenticate('jwt', { session: false }),
      isOfThisType(['offerer']),
      this.controller.index,
    );

    this.post(
      '/',
      passport.authenticate('jwt', { session: false }),
      isOfThisType(['applicant']),
      this.controller.create,
    );
  }
}

const interestedRouter = new InterestedRouter();

module.exports = {
  InterestedRouter,
  interestedRouter,
};
