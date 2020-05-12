const express = require('express');
const multer = require('multer');
const controller = require('./controller');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/images', upload.array('media', 10), controller.images);
router.post('/videos', controller.videos);

module.exports = router;
