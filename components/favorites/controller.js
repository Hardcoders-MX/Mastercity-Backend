const { success } = require('../../routes/response');

const index = (req, res, next) => {
  try {
    success(res, 'all rigth', false, 200);
  } catch (error) {
    next(error);
  }
};

const create = (req, res, next) => {
  try {
    success(res, 'all rigth', false, 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  create,
};
