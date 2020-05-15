const User = require('../auth/model');
const buildParams = require('../../utils/buildParams');
const { ServerError } = require('../../utils/errors');

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
 * Find a user by id
 * @param {*} userId
 */
const findById = async (userId) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new Error('not found');
  }
  return user;
};

/**
 * Update a property
 * @param {*} userId
 * @param {*} user
 */
const update = async (userId, user) => {
  const query = { _id: userId, isDisable: false };

  const params = validateParams(user);
  const updatedUser = await User.updateOne(query, params);

  if (updatedUser.nModified !== 1) throw new ServerError('Error to update user')

  return updatedUser;
};

/**
 * partial remove a property
 * @param {any} userId
 */
const disable = async (userId) => {
  const user = await User.updateOne({ _id: userId, isDisable: false }, { isDisable: true });

  if (user.ok !== 1) throw new ServerError('Error to delete user');
  if (user.nModified !== 1) throw new Error('This user was already disabled');

  return user;
};

module.exports = {
  findById,
  update,
  disable,
};
