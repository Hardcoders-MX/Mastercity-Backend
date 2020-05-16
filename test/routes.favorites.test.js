/* eslint-disable no-undef */
const assert = require('assert');
const proxyquire = require('proxyquire');
const testServer = require('../utils/testServer');
const { FavoritesService, FavoritesMock } = require('../utils/mocks/FavoritesMock');
const passport = require('../utils/mocks/PassportMock');


describe('routes - favorites', () => {
  const userId = FavoritesMock[0].user;
  const controller = proxyquire('../components/favorites/controller', {
    './service': FavoritesService,
  });
  const router = proxyquire('../components/favorites/routes', {
    './controller': controller,
    passport,
  });
  const request = testServer(router);

  describe('GET /favorites/:user', () => {
    it('should response with status code 200', (done) => {
      request.get(`/${userId}`).expect(200, done);
    });

    it('should response with a list of property favorites', (done) => {
      request.get(`/${userId}`)
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
});
