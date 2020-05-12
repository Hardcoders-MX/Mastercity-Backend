const express = require('express');
const router = express.Router();

const {
  getUser,
  updateUser,
  deleteUser,

} = require('./controller');

router.get('/:id', getUser);
router.put('/:id', updateUser);
router.patch('/:id', deleteUser);

module.exports = router;
