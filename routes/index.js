const authRoutes = require('../components/auth/routes');
/**
 * Receives a instance of express and apply resource routes
 * @param {express} app 
 */
const routes = (app) => {
  app.use('/api/auth', authRoutes);
}

module.exports = routes;
