const swaggerUi = require('swagger-ui-express');
const authRoutes = require('../components/auth/routes');
const propertyRoutes = require('../components/properties/routes');
const userRoutes = require('../components/users/routes');
const uploadRoutes = require('../components/upload/routes');
const favoritesRoutes = require('../components/favorites/routes');
const InteresteRouter = require('../components/interested/router');
const swaggerDoc = require('../swagger.json');
/**
 * Receives a instance of express and apply resource routes
 * @param {import("express").Express} app
 */
const routes = (app) => {
  app.use('/api/properties', propertyRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/uploads', uploadRoutes);
  app.use('/api/favorites', favoritesRoutes);
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  new InteresteRouter(app);
};

module.exports = routes;
