/* eslint-disable no-undef */
const assert = require('assert');
const proxyquire = require('proxyquire');
const { FavoritesMock } = require('../utils/mocks/FavoritesMock');
const {
  findStub,
  populateStub,
  findOneStub,
  createStub,
  mongooseLib,
} = require('../utils/mocks/mongooseLib');
const {
  FieldsRequiredError,
} = require('../utils/errors');

describe('service - favorites', () => {
  const userId = FavoritesMock[0].user;
  const propertyId = FavoritesMock[0].property;
  const service = proxyquire('../components/favorites/service', {
    './model': mongooseLib,
  });

  describe('when findAll method is called', async () => {
    it('should call the find MongoLib Method', async () => {
      await service.findAll(userId);
      assert.strictEqual(findStub.called, true);
      assert.strictEqual(populateStub.called, true);
    });

    it('should return a list of properties favorites', async () => {
      const result = await service.findAll(userId);
      const expected = FavoritesMock;
      assert.deepEqual(result, expected);
    });

    it('should generate a error', async () => {
      service.findAll(null)
        .catch((error) => {
          const result = error.message;
          const expected = new FieldsRequiredError('field is required', 400).message;
          assert.deepEqual(result, expected);
        });
    });
  });

  describe('when insert method is called', async () => {
    it('should return a property favorite', async () => {
      const result = await service.insert(userId, propertyId);
      const expected = 'This property was add to favorites';
      assert.deepEqual(result, expected);
    });

    it('should generate a error', async () => {
      service.insert(null, null)
        .catch((error) => {
          const result = error.message;
          const expected = 'all fileds are requires';
          assert.deepEqual(result, expected);
        });
    });

    it('should generate a error', async () => {
      service.insert(propertyId, userId)
        .catch((error) => {
          const result = error.message;
          const expected = 'This property added to favorites';
          assert.deepEqual(result, expected);
        });
    });
  });
});
