const express = require('express');
const passport = require('passport');
const controller = require('./controller');
const scopesValidationHandler = require('../../utils/middleware/scopesValidationHandler');

const routes = express.Router();

require('../auth/strategies/jwt');

routes.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:properties']),
  controller.index
);

routes.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['create:properties']),
  controller.create,
);

routes.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:properties']),
  controller.show
);

routes.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['update:properties']),
  controller.update
);

routes.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['delete:properties']),
  controller.destroy
);

module.exports = routes;
