const express = require('express');

const router = express.Router();

const passport = require('passport');


require('../auth/strategies/jwt');
const scopesValidationHandler = require('../../utils/middleware/scopesValidationHandler');
const {
  getUser,
  updateUser,
  deleteUser,
} = require('./controller');

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:users']),
  getUser
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['update:users']),
  updateUser
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['delete:users']),
  deleteUser
);

module.exports = router;
