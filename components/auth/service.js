const bcrypt = require('bcrypt');
const User = require('./model');
const buildParams = require('../../utils/buildParams');
const { FieldsRequiredError, NotFoundError } = require('../../utils/errors');

/**
 * receive parameters and filter with only valid params
 * @param {Object} params
 */
const validateParams = (params) => {
  const validParams = [
    'firstName',
    'lastName',
    'email',
    'password',
    'userType',
    'profileType',
  ];
  return buildParams(validParams, params);
};

/**
 * Validate that required params it existed
 * @param {Object} params
 */
const validateRequiredParams = (params) => {
  const requiredParams = [
    'firstName',
    'lastName',
    'email',
    'password',
    'userType',
    'profileType',
  ];

  requiredParams.forEach((field) => {
    if (!params[field]) {
      throw new FieldsRequiredError(`Field ${field} is required`, 400);
    }
  });

  return true;
};


/**
 * Inert one user in the database
 * @param {User} user
 */
const addUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  // eslint-disable-next-line no-param-reassign
  user.password = hashedPassword;

  const params = validateParams(user);
  const isDisable = false;

  const createdUser = await User.create({
    ...params,
    isDisable,
  });

  return createdUser;
};


/**
 * Get a user by email
 * @param {*} userId
 */
const getUser = async (email) => {
  const user = await User.find({ email });
  if (!user) {
    throw new Error('not found');
  }
  return user;
};

module.exports = {
  add: addUser,
  getUser,
};
