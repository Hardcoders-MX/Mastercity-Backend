const Property = require('./model');
const buildParams = require('../../utils/buildParams');
const { FieldsRequiredError, NotFoundError } = require('../../utils/errors');

/**
 * receive parameters and filter with only valid params
 * @param {Object} params
 */
const validateParams = (params) => {
  const validParams = [
    'propertyType',
    'location',
    'price',
    'rooms',
    'bathrooms',
    'square',
    'priceMeters',
    'furnish',
    'parking',
    'swimmingPool',
    'heating',
    'security',
    'cellar',
    'elevator',
  ];
  return buildParams(validParams, params);
};

/**
 * Validate that required params it existed
 * @param {Object} params
 */
const validateRequiredParams = (params) => {
  const requiredParams = [
    'propertyType',
    'location',
    'price',
    'rooms',
    'bathrooms',
    'square',
    'priceMeters',
    'furnish',
    'parking',
    'swimmingPool',
    'heating',
    'security',
    'cellar',
    'elevator',
  ];
  requiredParams.forEach((field) => {
    if (!params[field]) {
      throw new FieldsRequiredError(`Field ${field} is required`, 400);
    }
  });

  return true;
};

/**
 * Find a list of properties with pagination
 * receive two type of filters in the same object
 * filter to query in mongo: limit, sortName, sort, page
 * filters the one property: propertyType, location, rooms,
 * bathrooms, square, priceMeters, furnish, parking,
 * swimmingPool, heating, security, cellar, elevator
 * @param {Object} filters
 */
const findAll = async (filters) => {
  const limit = Number(filters.limit) || 10;
  const sortName = filters.sort_name ? String(filters.sort_name) : '_id';
  const sort = Number(filters.sort) || -1;
  const skip = (Number(filters.page || 1) - 1) * limit;

  const query = validateParams(filters);
  query.isDisable = false;
  query.isAprove = true;
  const properties = await Property.find(query).limit(limit).sort({
    [sortName]: sort,
  }).skip(skip);

  if (properties.length === 0) {
    throw new NotFoundError('Not found properties', 404);
  }

  const totalProperties = await Property.countDocuments(query);
  const pagination = {
    totalProperties,
    totalPages: Math.ceil(totalProperties / limit),
    page: filters.page || 1,
  };
  return { properties, pagination };
};

/**
 * Inert one property in the database
 * @param {Property} property
 */
const insert = async (property) => {
  const params = validateParams(property);
  const isAprove = false;
  const isDisable = false;

  validateRequiredParams(params);

  const createdProperty = await Property.create({
    ...params,
    isAprove,
    isDisable,
  });

  return createdProperty;
};

/**
 * Find a property by _id
 * @param {*} propertyId
 */
const findById = async (propertyId) => {
  const property = await Property.findOne({ _id: propertyId, isDisable: false, isAprove: true });
  if (!property) {
    throw new Error('not found');
  }
  return property;
};

module.exports = {
  findAll,
  findById,
  insert,
};
