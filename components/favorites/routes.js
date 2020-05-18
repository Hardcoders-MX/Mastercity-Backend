const express = require('express');
const passport = require('passport');

const controller = require('./controller');
const scopesValidationHandler = require('../../utils/middleware/scopesValidationHandler');

const router = express.Router();

require('../auth/strategies/jwt');

router.get(
  '/:user',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:favorites-applicant']),
  controller.index
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['create:favorites-applicant']),
  controller.create
);

module.exports = router;
