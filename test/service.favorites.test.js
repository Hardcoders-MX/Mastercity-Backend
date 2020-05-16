/* eslint-disable no-undef */
const assert = require('assert');
const proxyquire = require('proxyquire');
const { FavoritesMock } = require('../utils/mocks/FavoritesMock');
const {
  findStub,
  populateStub,
  mongooseLib,
} = require('../utils/mocks/mongooseLib');
const {
  FieldsRequiredError,
} = require('../utils/errors');

describe('service - favorites', () => {
  const userId = FavoritesMock[0].user;
  const service = proxyquire('../components/favorites/service', {
    './model': mongooseLib,
  });

  describe('when findAll method is called', async () => {
    it('should call the find MongoLib Method', async () => {
      await service.findAll(userId);
      assert.strictEqual(findStub.called, true);
      assert.strictEqual(populateStub.called, true);
    });

    it('should return a property favorite', async () => {
      const result = await service.findAll(userId);
      const expected = FavoritesMock[0];
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
});
