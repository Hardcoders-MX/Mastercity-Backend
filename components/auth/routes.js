const express = require('express');

const router = express.Router();

const {
  create,
  signin,
} = require('./controller');

router.post('/sign-up', create);
router.post('/sign-in', signin);


module.exports = router;
