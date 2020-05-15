const express = require('express');

const router = express.Router();

const passport = require('passport');

require('../auth/strategies/jwt');
const {
  getUser,
  updateUser,
  deleteUser,

} = require('./controller');

router.get('/:id', passport.authenticate('jwt', { session: false }), getUser);
router.put('/:id', passport.authenticate('jwt', { session: false }), updateUser);
router.patch('/:id', passport.authenticate('jwt', { session: false }), deleteUser);

module.exports = router;
