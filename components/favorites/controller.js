const serviceFavorites = require('./service');
const { success } = require('../../routes/response');

const index = (req, res, next) => {
  try {
    success(res, 'all rigth', false, 200);
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
