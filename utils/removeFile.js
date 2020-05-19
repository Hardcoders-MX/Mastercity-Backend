const fs = require('fs');

/**
 * return a promise that remove a file
 * @param {*} path
 */
const removeFile = (path) => new Promise((resolve, reject) => {
  fs.unlink(path, (error) => {
    if (error) reject(error);
    resolve('file wa delete');
  });
});

module.exports = removeFile;
