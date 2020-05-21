const express = require('express');
const InterestedController = require('./controller');

const { Router } = express;

class InterestedRouter extends Router {
  constructor(app = false, controller = new InterestedController()) {
    super();
    this.controller = controller;
    if (app !== false) {
      app.use('/api/interested', this);
    }

    this.get('/', this.controller.index);
  }
}

const interestedRouter = new InterestedRouter();

module.exports = {
  InterestedRouter,
  interestedRouter,
};
