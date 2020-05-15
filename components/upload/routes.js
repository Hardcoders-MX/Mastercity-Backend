const express = require('express');
const multer = require('multer');
const controller = require('./controller');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.array('media', 5), controller.upload);
router.get('/:id', controller.show);

module.exports = router;
