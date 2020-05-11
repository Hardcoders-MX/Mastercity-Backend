const express = require('express');

const router = express.Router();

const {
  getUser,
} = require('./controller');

router.get('/:id', getUser);

module.exports = router;
