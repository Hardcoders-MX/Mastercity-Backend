const express = require('express');
const InterestedController = require('./controller');

const { Router } = express;

class InterestedRouter extends Router {
  constructor(app, controller = new InterestedController()) {
    super();
    this.controller = controller;

    app.use('/api/interested', this);

    this.get('/', this.controller.index);
  }
}

module.exports = InterestedRouter;
