const { success } = require('../../routes/response');

const images = async (req, res, next) => {
  try {
    success(res, 'media file uploaded', {}, 200);
  } catch (error) {
    next(error);
  }
};

const videos = async (req, res, next) => {
  try {
    success(res, 'media file uploaded', {}, 200);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  images,
  videos,
};
