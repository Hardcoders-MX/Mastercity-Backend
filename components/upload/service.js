const cloudinary = require('cloudinary').v2;
const { FileNotValid } = require('../../utils/errors');

/**
 * validate if is a video
 * @param {string} type
 * @param {number} size
 */
const isVideo = (type, size) => {
  if (type === 'mp4' && size < 10500000) {
    return true;
  }
  return false;
};

/**
 * validate if is a image
 * @param {string} type
 * @param {number} size
 */
const isImage = (type, size) => {
  const validType = type === 'jpg' || type === 'png' || type === 'jpeg' || type === 'gif';
  if (validType && size < 5500000) {
    return true;
  }
  return false;
};

/**
 * validate that format of file is valid
 * @param {*} file
 */
const validateTypeAndSize = (file) => new Promise((resolve, reject) => {
  const type = file.mimetype.split('/')[1];
  const { size } = file;

  if (!isVideo(type, size) && !isImage(type, size)) {
    return reject(new FileNotValid());
  }

  return resolve(file);
});

/**
 * validate format of all files
 * @param {*} files
 */
const validateFiles = (files) => {
  const validatedFiles = files.map((file) => validateTypeAndSize(file));
  return Promise.all(validatedFiles);
};

/**
 * upload files and save in cloudinary after delete files
 * @param {*} files
 */
const upload = async (files) => {
  const validatedFiles = await validateFiles(files);
  return validatedFiles;
};

module.exports = {
  upload,
};
