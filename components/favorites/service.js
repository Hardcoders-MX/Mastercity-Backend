const Favorite = require('./model');

const { FieldsRequiredError, ServerError } = require('../../utils/errors');

const insert = async (userId, propertyId) => {
  if (!userId || !propertyId) {
    throw new FieldsRequiredError('all fileds are requires', 400);
  }
  const query = { user: userId, property: propertyId, isDisabled: false };

  const existedFavorite = await Favorite.findOne(query);
  if (existedFavorite !== null) return 'This property was add to favorites';

  const createdFavorite = await Favorite.create(query);
  return createdFavorite;
};

const findAll = async (userId) => {
  if (!userId) throw new FieldsRequiredError('field is required', 400);

  const favorites = await Favorite.find({ user: userId, isDisabled: false }).populate('property');
  return favorites;
};

const destroy = async (userId, favoriteId) => {
  if (!userId || !favoriteId) throw new FieldsRequiredError('All fields are required', 400);

  const query = { _id: favoriteId, user: userId, isDisabled: false };
  const deletedFavorite = await Favorite.updateOne(query, { isDisabled: true });
  if (deletedFavorite.nModified !== 1) {
    throw new ServerError();
  }

  return 'property favorite was delete';
};

module.exports = {
  insert,
  findAll,
  destroy,
};
