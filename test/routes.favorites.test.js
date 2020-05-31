/* eslint-disable quote-props */
/* eslint-disable no-undef */
const assert = require('assert');
const proxyquire = require('proxyquire');
const testServer = require('../utils/testServer');
const { FavoritesService, FavoritesMock } = require('../utils/mocks/FavoritesMock');
const PassportMock = require('../utils/mocks/PassportMock');
const scopesValidationHandlerMock = require('../utils/mocks/scopesValidationHandlerMock');
const isOfThisTypeMock = require('../utils/mocks/isOfThisTypeMock');

describe('routes - favorites', () => {
  const controller = proxyquire('../components/favorites/controller', {
    './service': FavoritesService,
  });
  const router = proxyquire('../components/favorites/routes', {
    './controller': controller,
    'passport': PassportMock,
    '../../utils/middleware/scopesValidationHandler': scopesValidationHandlerMock,
    '../../utils/middleware/isOfThisType': isOfThisTypeMock,
  });
  const request = testServer(router);

  describe('GET /favorites', () => {
    it('should response with status code 200', (done) => {
      request.get('/').expect(200, done);
    });

    it('should response with a list of property favorites', (done) => {
      request.get('/')
        .end((error, res) => {
          assert.deepEqual(res.body, {
            error: false,
            status: 200,
            message: 'favorites listed',
            body: FavoritesMock,
          });
          done();
        });
    });

    it('should response with a error', (done) => {
      request.get('/error')
        .end((error, res) => {
          assert.deepEqual(res.body, {});
          done();
        });
    });
  });

  describe('POST /favorites', () => {
    const data = {
      propertyId: FavoritesMock[0].property,
      userId: FavoritesMock[0].user,
    };
    it('should response with status code 201', (done) => {
      request.post('/').send(data).expect(201, done);
    });

    it('should response with a favorite created', (done) => {
      request
        .post('/')
        .send(data)
        .end((error, res) => {
          assert.deepEqual(res.body, {
            error: false,
            status: 201,
            message: 'favorite created',
            body: FavoritesMock[0],
          });
          done();
        });
    });

    it('should response with a error', (done) => {
      request
        .post('/')
        .send({})
        .end((error, res) => {
          assert.deepEqual(res.body, {});
          done();
        });
    });
  });
});
