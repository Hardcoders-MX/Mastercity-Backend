/* eslint-disable no-throw-literal */
const PropertiesMock = [{
  id: 123456789,
  propertyType: 'house',
  location: {
    lat: -35,
    len: 15,
  },
  price: 3500,
  rooms: 2,
  bathrooms: 1,
  squareMeters: 64,
  priceMeters: 200,
  furnish: false,
  parking: false,
  swimmingPool: false,
  heating: false,
  security: true,
  cellar: true,
  elevator: false,
  isAprove: true,
  isDisable: false,
}];

const findAll = async (filters) => {
  if (filters.error) throw false;
  return Promise.resolve({
    properties: PropertiesMock,
    pagination: {
      totalProperties: PropertiesMock.length,
      totalPages: 1,
      page: 1,
    },
  });
};

const findById = async (propertyId) => {
  if (propertyId === 'error') throw false;
  const property = PropertiesMock.filter(({ id }) => id === Number(propertyId));
  return Promise.resolve(property[0]);
};

module.exports = {
  PropertiesMock,
  PropertiesService: {
    findAll,
    findById,
  },
};
