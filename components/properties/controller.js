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

/**
 * Response with a new property created
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const create = async (req, res, next) => {
  const property = req.body;
  try {
    const createdProperty = await serviceProperty.insert(property);
    success(res, 'property created', createdProperty, 201);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  index,
  create,
};
