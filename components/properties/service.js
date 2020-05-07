const Property = require('./model');

const findAll = async (filters) => {
  const properties = await Property.find(filters);
  return properties;
};

module.exports = {
  findAll,
};
