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
  isOfThisType(['applicant', 'offerer', 'admin']),
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
  isOfThisType(['admin']),
  controller.unapproved,
);

routes.get(
  '/my',
  scopesValidationHandler(['read:properties']),
  isOfThisType(['offerer']),
  controller.myProperties,
);

routes.get(
  '/:id',
  scopesValidationHandler(['read:properties']),
  isOfThisType(['applicant', 'offerer', 'admin']),
  controller.show,
);

routes.patch(
  '/:id',
  scopesValidationHandler(['update:properties']),
  isOfThisType(['offerer']),
  controller.update,
);

routes.delete(
  '/:id',
  scopesValidationHandler(['delete:properties']),
  isOfThisType(['offerer']),
  controller.destroy,
);

routes.patch(
  '/:id/approve',
  scopesValidationHandler(['update:properties']),
  controller.approve,
);

module.exports = routes;
