const debug = require('debug')('app:properties');
const serviceProperty = require('./service');
const { success } = require('../../routes/response');

/**
 * Response a list of properties
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const index = async (req, res, next) => {
  const filters = req.query;
  try {
    const properties = await serviceProperty.findAll(filters);
    success(res, 'properties listed', properties, 200);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  index,
};
