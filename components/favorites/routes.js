const express = require('express');
const passport = require('passport');

const controller = require('./controller');

const router = express.Router();

require('../auth/strategies/jwt');

router.get('/:user', passport.authenticate('jwt', { session: false }), controller.index);
router.post('/', passport.authenticate('jwt', { session: false }), controller.create);

module.exports = router;
