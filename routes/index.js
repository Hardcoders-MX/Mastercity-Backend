const express = require('express');

const users = require('../components/users/routes');

/**
 * Receives a instance of express and apply resource routes
 * @param {express} app 
 */
const routes = (app) => {
  app.use('/api/users', users);
}

module.exports = routes;
