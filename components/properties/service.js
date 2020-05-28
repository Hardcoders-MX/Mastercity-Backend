/* eslint-disable no-underscore-dangle */
const Property = require('./model');
const buildParams = require('../../utils/buildParams');
const { FieldsRequiredError, NotFoundError, ServerError } = require('../../utils/errors');
const setupPagination = require('../../utils/paginate/setupPagination');
const toDoPagination = require('../../utils/paginate/toDoPagination');
const sendEmail = require('../../utils/mail/index');
const { info, error } = require('../../utils/debug');

const fields = [
  'address.postalCode',
  'address.country',
  'address.state',
  'address.townHall',
  'address.colony',
  'address.street',
  'address.outdoorNumber',
  'address.interiorNumber',
  'location.lat',
  'location.len',
  'mediaFiles',
  'propertyType',
  'operationType',
  'price',
  'rooms',
  'bathrooms',
  'squareMeters',
  'priceMeters',
  'furnish',
  'parking',
  'swimmingPool',
  'heating',
  'security',
  'cellar',
  'elevator',
];

const sendNotification = async (id) => {
  const property = await Property.findById(id).populate('offerer');
  const { email } = property.offerer;
  const subject = 'Property approved';
  const body = `
      <h1>Hello ${property.offerer.firstName} ${property.offerer.lastName}</h1> 
      <p>congratulations your property with id ${property._id} was approve</p>
    `;
  return sendEmail(email, subject, body);
};


/**
 * receive parameters and filter with only valid params
 * @param {Object} params
 */
const validateParams = (validParams, params) => buildParams(validParams, params);

/**
 * Validate that required params it existed
 * @param {Object} params
 */
const validateRequiredParams = (requiredParams, params) => {
  requiredParams.forEach((field) => {
    if (!params[field]) {
      throw new FieldsRequiredError(`Field ${field} is required`, 400);
    }
  });

  return true;
};

const findProperties = async (query, limit, sort, skip) => (
  await Property.find(query)
    .limit(limit)
    .sort(sort)
    .skip(skip)
    .populate('offerer')
).map((prop) => {
  // eslint-disable-next-line no-underscore-dangle
  const property = { ...prop._doc };
  if (property.offerer) {
    property.offerer.password = '';
    return property;
  }
  return prop;
});

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
  const {
    limit,
    skip,
    sort,
    page,
  } = setupPagination(filters);

  const query = validateParams(fields, filters);
  query.isDisabled = false;
  query.isApprove = true;

  const properties = await findProperties(query, limit, sort, skip);
  const pagination = await toDoPagination(Property, { limit, page }, query);

  return { properties, pagination };
};

/**
 * Inert one property in the database
 * @param {Property} property
 */
const insert = async (offererId, property) => {
  const params = validateParams(fields, property);
  const isApprove = false;
  const isDisabled = false;
  const offerer = offererId;

  validateRequiredParams(fields, params);

  const createdProperty = await Property.create({
    offerer,
    ...params,
    isApprove,
    isDisabled,
  });

  return createdProperty;
};

/**
 * Find a property by _id
 * @param {*} propertyId
 */
const findById = async (propertyId) => {
  const property = await Property.findOne({ _id: propertyId, isDisabled: false, isApprove: true }).populate('offerer');
  if (!property) {
    throw new NotFoundError('not found property');
  }
  if (property.offerer) {
    property.offerer.password = '';
  }
  return property;
};

/**
 * Update a property
 * @param {*} propertyId
 * @param {*} property
 */
const update = async (propertyId, property, offererId) => {
  const query = { _id: propertyId, isDisabled: false, offerer: offererId };

  const params = validateParams(fields, property);
  const updatedProperty = await Property.updateOne(query, { $set: { ...params } });

  if (updatedProperty.nModified !== 1) {
    throw new ServerError('error to update property');
  }

  return false;
};

/**
 * partial remove a property
 * @param {any} propertyId
 */
const destroy = async (propertyId, offererId) => {
  const params = { isDisabled: true };
  const query = { _id: propertyId, isDisabled: false, offerer: offererId };
  const deletedProperty = await Property.updateOne(query, params);

  if (deletedProperty.nModified !== 1) {
    throw new ServerError('error to delete property');
  }
  return false;
};

/**
 * Valid that profile type is admin and approved
 * @param {*} propertyId
 * @param {*} profileType
 */
const approve = async (propertyId) => {
  const query = { _id: propertyId, isDisabled: false };
  const approvedProperty = await Property.updateOne(query, { isApprove: true });

  if (approvedProperty.nModified !== 1) {
    throw new ServerError('error to approve property');
  }

  sendNotification(propertyId)
    .then((res) => {
      info(res.messageId);
      info('email sended');
    })
    .catch((err) => {
      error(err.message);
      error(err.stack);
    });

  return false;
};

const findMyProperties = async (offererId, queries) => {
  if (!offererId) throw new FieldsRequiredError();

  const {
    limit,
    skip,
    sort,
    page,
  } = setupPagination(queries);

  const query = { offerer: offererId, isDisabled: false };
  const properties = await findProperties(query, limit, sort, skip);

  const pagination = await toDoPagination(Property, { limit, page }, query);

  return { properties, pagination };
};

const findUnapproveProperties = async (queries) => {
  const {
    limit,
    skip,
    sort,
    page,
  } = setupPagination(queries);

  const query = { isApprove: false };
  const properties = await findProperties(query, limit, sort, skip);

  const pagination = await toDoPagination(Property, { limit, page }, query);

  return { properties, pagination };
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  destroy,
  approve,
  findMyProperties,
  findUnapproveProperties,
};
