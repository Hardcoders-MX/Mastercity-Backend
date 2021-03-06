const bcrypt = require('bcrypt');
const User = require('./model');
const buildParams = require('../../utils/buildParams');

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
    'direction',
    'phone',
    'avatar',
    'userType',
    'profileType',
    'isRealEstate',
  ];
  return buildParams(validParams, params);
};

/**
 * Validate that required params it existed
 * @param {Object} params
 */
/*
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
*/

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
  let user = await User.findOne({ email });
  // eslint-disable-next-line no-unused-expressions
  (!user) ? user = [] : user;

  return user;
};

module.exports = {
  add: addUser,
  getUser,
};
