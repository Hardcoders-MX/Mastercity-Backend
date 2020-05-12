const config = require('../../config');
const serviceUser = require('./service');
const { success } = require('../../routes/response');

/**
 * Response a list of properties
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const getUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await serviceUser.findById(userId);
    success(res, 'user retrieved', user, 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Response with a updated property
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const userData = req.body;

  try {
    let data = '';
    const user = await serviceUser.update(userId, userData);
    config.srv.mode === 'development' ? data = user : data = 'OK';
    success(res, 'User updated', data, 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Response with a updated property
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    let data = '';
    const user = await serviceUser.disable(userId);
    config.srv.mode === 'development' ? data = user : data = 'OK';
    success(res, 'User deleted', data, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
};
