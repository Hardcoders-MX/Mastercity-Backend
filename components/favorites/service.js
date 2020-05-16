const { FieldsRequiredError } = require('../../utils/errors');
const Favorite = require('./model');

const insert = async (userId, propertyId) => {
  if (!userId || !propertyId) {
    throw new FieldsRequiredError('all fileds are requires', 400);
  }
  const createdFavorite = await Favorite.create({ user: userId, property: propertyId });
  return createdFavorite;
};

module.exports = {
  insert,
};
