const cloudinary = require('cloudinary').v2;

/**
 * Save a file in cloudinary
 * @param {*} file
 */
const uploader = (file) => cloudinary.uploader.upload(file.path, {
  resource_type: file.mimetype.split('/')[0],
});

module.exports = uploader;
