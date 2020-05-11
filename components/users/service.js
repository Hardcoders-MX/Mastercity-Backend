const User = require('../auth/model');
const { ServerError } = require('../../utils/errors');

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

const disable = async (userId) => {
  const user = await User.updateOne({ _id: userId, isDisable: false }, { isDisable: true });

  if (user.ok !== 1) throw new ServerError('Error to delete user')
  if (user.nModified !== 1) throw new Error('This user was already disabled')

  return user;
};

module.exports = {
  findById,
  disable,
};
