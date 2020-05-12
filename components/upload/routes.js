const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.post('/images', controller.images);
router.post('/videos', controller.videos);

module.exports = router;
