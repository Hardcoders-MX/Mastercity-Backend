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
  controller.index,
);

routes.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['create:properties']),
  controller.create,
);

routes.get(
  '/unapproved',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:properties']),
  controller.unapproved,
);

routes.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:properties']),
  controller.show,
);

routes.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['update:properties']),
  controller.update,
);

routes.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['delete:properties']),
  controller.destroy,
);

routes.patch(
  '/:id/approve',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['update:properties']),
  controller.approve,
);

module.exports = routes;
