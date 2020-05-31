const express = require('express');
const multer = require('multer');
const passport = require('passport');
const controller = require('./controller');
const isOfThisType = require('../../utils/middleware/isOfThisType');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

require('../auth/strategies/jwt');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  isOfThisType(['offerer', 'applicant', 'admin']),
  upload.array('media', 5),
  controller.upload,
);
router.get(
  '/:id',
  controller.show,
);

module.exports = router;
