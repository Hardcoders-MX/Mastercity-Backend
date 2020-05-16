const express = require('express');
const passport = require('passport');
const controller = require('./controller');
const scopesValidationHandler = require('../../utils/middleware/scopesValidationHandler');

const routes = express.Router();

require('../auth/strategies/jwt');

routes.get('/', passport.authenticate('jwt', { session: false }), controller.index);
routes.post('/', passport.authenticate('jwt', { session: false }), controller.create);
routes.get('/:id', passport.authenticate('jwt', { session: false }), controller.show);
routes.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update);
routes.delete('/:id', passport.authenticate('jwt', { session: false }), controller.destroy);
routes.patch(
  '/:id/approve',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['update:properties']),
  controller.approve,
);

module.exports = routes;
