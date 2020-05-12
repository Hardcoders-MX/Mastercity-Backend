const serviceUpload = require('./service');
const { success } = require('../../routes/response');

const upload = async (req, res, next) => {
  const { files } = req;
  try {
    const uploaded = await serviceUpload.upload(files);
    success(res, 'media file uploaded', uploaded, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload,
};
