const User = require('../auth/model');

/**
 * Find a user by id
 * @param {*} userId
 */
const findById = async (userId) => {
  console.log('algo', userId)
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new Error('not found');
  }
  return user;
};

module.exports = {
  findById,
};
