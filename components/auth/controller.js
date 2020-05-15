const config = require('../../config');
const serviceUser = require('./service');
const { success } = require('../../routes/response');

const create = async (req, res, next) => {
  const { body: user } = req;

  try {
    const createdUser = await serviceUser.add(user);
    let data = '';
    // eslint-disable-next-line no-unused-expressions
    config.srv.mode === 'development' ? data = createdUser : data = '';
    success(res, 'User created', data, 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};
