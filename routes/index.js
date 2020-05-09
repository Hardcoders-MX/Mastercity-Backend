const authRoutes = require('../components/auth/routes');
const propertyRoutes = require('../components/properties/routes');

/**
 * Receives a instance of express and apply resource routes
 * @param {import("express").Express} app
 */
const routes = (app) => {
  app.use('/api/properties', propertyRoutes);
  app.use('/api/auth', authRoutes);
};

module.exports = routes;
