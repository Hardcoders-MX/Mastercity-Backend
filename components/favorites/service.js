const Favorite = require('./model');

const { FieldsRequiredError } = require('../../utils/errors');

const insert = async (userId, propertyId) => {
  if (!userId || !propertyId) {
    throw new FieldsRequiredError('all fileds are requires', 400);
  }
  const query = { user: userId, property: propertyId };

  const existedFavorite = await Favorite.findOne(query);
  if (existedFavorite !== null) throw new Error('This property added to favorites');

  const createdFavorite = await Favorite.create(query);
  return createdFavorite;
};

const findAll = async (userId) => {
  if (!userId) throw new FieldsRequiredError('field is required', 400);

  const favorites = await Favorite.find({ user: userId }).populate('property');
  return favorites;
};

module.exports = {
  insert,
  findAll,
};
