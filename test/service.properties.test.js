/* eslint-disable no-undef */
const assert = require('assert');
const proxyquire = require('proxyquire');
const {
  countDocumentsStub,
  findStub,
  findOneStub,
  mongooseLib,
} = require('../utils/mocks/mongooseLib');
const { PropertiesMock } = require('../utils/mocks/PropertiesMock');
const { NotFoundError } = require('../utils/errors');

describe('service - properties', () => {
  const service = proxyquire('../components/properties/service', {
    './model': mongooseLib,
  });

  describe('when findAll method is called', async () => {
    it('should call the find MongoLib Method', async () => {
      await service.findAll({});
      assert.strictEqual(findStub.called, true);
      assert.strictEqual(countDocumentsStub.called, true);
    });

    it('should return an object with properties and pagination', async () => {
      const result = await service.findAll({});
      const expected = {
        properties: PropertiesMock,
        pagination: {
          page: 1,
          totalPages: 1,
          totalProperties: 10,
        },
      };
      assert.deepEqual(result, expected);
    });

    it('should generate a error', async () => {
      service.findAll({ page: 2 })
        .catch((error) => {
          const result = error;
          const expected = new NotFoundError('Not found properties', 404);
          assert.deepEqual(result, expected);
        });
    });
  });

  describe('when findById method is called', async () => {
    it('should call the findOne MongoLib Method', async () => {
      await service.findById(10);
      assert.strictEqual(findOneStub.called, true);
    });
    it('should call the findOne MongoLib Method', async () => {
      const result = await service.findById(PropertiesMock[0].id);
      const expected = PropertiesMock[0];
      assert.strictEqual(result, expected);
    });
    it('shouldgenerate a error', async () => {
      service.findById(PropertiesMock[0].id)
        .catch((error) => {
          const result = error;
          const expected = new NotFoundError('not found property');
          assert.strictEqual(result, expected);
        });
    });
  });
});
