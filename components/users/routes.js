const express = require('express');
const router = express.Router();

const {
  getUser,
  deleteUser,

} = require('./controller');

router.get('/:id', getUser);
router.patch('/:id', deleteUser);

module.exports = router;
