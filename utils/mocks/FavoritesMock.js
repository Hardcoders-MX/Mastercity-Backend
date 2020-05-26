/* eslint-disable no-throw-literal */
const FavoritesMock = [{
  user: '5ebf07ad902a3d1094137b58',
  property: '5eb5c2bbdfb39c0ae3d8f3de',
}];

const insert = async (userId, propertyId) => {
  if (!userId || !propertyId) throw false;
  return Promise.resolve(FavoritesMock[0]);
};

const findAll = async (userId) => {
  if (userId === 'error') throw false;
  return Promise.resolve(FavoritesMock);
};

module.exports = {
  FavoritesMock,
  FavoritesService: {
    insert,
    findAll,
  },
};
