const express = require('express');
const passport = require('passport');
const controller = require('./controller');
const scopesValidationHandler = require('../../utils/middleware/scopesValidationHandler');
const isOfThisType = require('../../utils/middleware/isOfThisType');

const routes = express.Router();

require('../auth/strategies/jwt');

routes.use(passport.authenticate('jwt', { session: false }));
routes.get(
  '/',
  scopesValidationHandler(['read:properties']),
  controller.index,
);

routes.post(
  '/',
  scopesValidationHandler(['create:properties']),
  isOfThisType(['offerer']),
  controller.create,
);

routes.get(
  '/unapproved',
  scopesValidationHandler(['read:properties']),
  controller.unapproved,
);

routes.get(
  '/:id',
  scopesValidationHandler(['read:properties']),
  controller.show,
);

routes.patch(
  '/:id',
  scopesValidationHandler(['update:properties']),
  controller.update,
);

routes.delete(
  '/:id',
  scopesValidationHandler(['delete:properties']),
  controller.destroy,
);

routes.patch(
  '/:id/approve',
  scopesValidationHandler(['update:properties']),
  controller.approve,
);

module.exports = routes;
