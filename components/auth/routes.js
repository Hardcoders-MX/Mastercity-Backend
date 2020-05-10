const express = require('express');

const router = express.Router();

const {
  create,
} = require('./controller');

router.post('/sign-up', create);

module.exports = router;
