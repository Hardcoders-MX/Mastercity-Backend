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

module.exports = {
  getUser
};
