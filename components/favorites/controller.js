const serviceFavorites = require('./service');
const { success } = require('../../routes/response');

const index = async (req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  const { _id: userId } = req.user._doc;
  try {
    const favorites = await serviceFavorites.findAll(userId);
    success(res, 'favorites listed', favorites, 200);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  const { _id: userId } = req.user._doc;
  const { propertyId } = req.body;
  try {
    const createdFavorite = await serviceFavorites.insert(userId, propertyId);
    success(res, 'favorite created', createdFavorite, 201);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  const { _id: userId } = req.user._doc;
  const propertyId = req.params.id;
  try {
    const deletedFavorite = await serviceFavorites.destroy(userId, propertyId);
    success(res, 'favorite deleted', deletedFavorite, 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  create,
  destroy,
};
