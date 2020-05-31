const express = require('express');
const passport = require('passport');

const controller = require('./controller');
const scopesValidationHandler = require('../../utils/middleware/scopesValidationHandler');
const isOfThisType = require('../../utils/middleware/isOfThisType');

const router = express.Router();

require('../auth/strategies/jwt');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:favorites-applicant']),
  isOfThisType(['applicant']),
  controller.index,
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['create:favorites-applicant']),
  isOfThisType(['applicant']),
  controller.create,
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isOfThisType(['applicant']),
  controller.destroy,
);

module.exports = router;
