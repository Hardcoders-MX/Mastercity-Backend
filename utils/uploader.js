/* eslint-disable camelcase */
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const config = require('../config');

/**
 * Savel file in local
 * @param {*} file
 */
const saveInLocal = (file) => new Promise((resolve, reject) => {
  const { originalname } = file;
  const newPath = `${file.path}.${originalname}`;

  const secure_url = `http://localhost:${config.srv.port}/api/uploads/${newPath.split('/')[1]}`;
  const resource_type = file.mimetype.split('/')[0];
  const format = file.mimetype.split('/')[1];

  fs.copyFile(file.path, newPath, (error) => {
    if (error) return reject(error);
    return resolve({ secure_url, resource_type, format });
  });
});

/**
 * Save a file in cloudinary if is mode production
 * is mode develompent save in local
 * @param {*} file
 */
const uploader = (file) => {
  if (config.srv.mode === 'development') {
    return saveInLocal(file);
  }

  const type = file.mimetype.split('/')[0];
  return cloudinary.uploader.upload(file.path, {
    resource_type: type,
  });
};

module.exports = uploader;
