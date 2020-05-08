const Property = require('./model');
const buildParams = require('../../utils/buildParams');

const findAll = async (filters) => {
  const limit = Number(filters.limit) || 10;
  const sortName = filters.sort_name ? String(filters.sort_name) : '_id';
  const sort = Number(filters.sort) || -1;
  const skip = (Number(filters.page || 1) - 1) * limit;

  const validFilters = [
    'limit',
    'sort',
    'sort_name',
    'page',
    'propertyType',
    'location',
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

  const query = buildParams(validFilters, filters);
  const properties = await Property.find(query).limit(limit).sort({
    [sortName]: sort,
  }).skip(skip);

  if (properties.length === 0) {
    throw new Error('Not found properties');
  }

  const totalProperties = await Property.countDocuments({ isPublic: true, isActive: true });
  const pagination = {
    totalProperties,
    totalPages: Math.ceil(totalProperties / limit),
    page: filters.page || 1,
  };
  return { properties, pagination };
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
};
