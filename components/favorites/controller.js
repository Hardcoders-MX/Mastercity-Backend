const serviceFavorites = require('./service');
const { success } = require('../../routes/response');

const index = async (req, res, next) => {
  const userId = req.params.user;
  try {
    const favorites = await serviceFavorites.findAll(userId);
    success(res, 'favorites listed', favorites, 200);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { propertyId } = req.body;
  const { userId } = req.body;
  try {
    const createdFavorite = await serviceFavorites.insert(userId, propertyId);
    success(res, 'favorite created', createdFavorite, 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  create,
};
