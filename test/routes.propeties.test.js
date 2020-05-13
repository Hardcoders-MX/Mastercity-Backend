/* eslint-disable no-undef */
const assert = require('assert');
const proxyquire = require('proxyquire');
const testServer = require('../utils/testServer');
const { PropertiesService, PropertiesMock } = require('../utils/mocks/PropertiesMock');

describe('routes - properties', () => {
  const controller = proxyquire('../components/properties/controller', {
    './service': PropertiesService,
  });
  const router = proxyquire('../components/properties/routes', {
    './controller': controller,
  });

  const request = testServer(router);

  describe('GET /properties', () => {
    it('should response with status code 200', (done) => {
      request.get('/').expect(200, done);
    });

    it('should response with a list of properties', (done) => {
      request.get('/')
        .end((error, res) => {
          assert.deepEqual(res.body, {
            error: false,
            status: 200,
            message: 'properties listed',
            body: {
              properties: PropertiesMock,
              pagination: {
                totalProperties: PropertiesMock.length,
                totalPages: 1,
                page: 1,
              },
            },
          });
          done();
        });
    });

    it('should response with a error', (done) => {
      request
        .get('/')
        .query({ error: true })
        .end((error, res) => {
          assert.deepEqual(res.body, {});
          done();
        });
    });
  });

  describe('GET /properties/:id', () => {
    it('should response with status code 200', (done) => {
      request.get(`/${PropertiesMock[0].id}`).expect(200, done);
    });
    it('should response with a property', (done) => {
      request.get(`/${PropertiesMock[0].id}`)
        .end((error, res) => {
          assert.deepEqual(res.body, {
            error: false,
            status: 200,
            message: 'property retrieved',
            body: PropertiesMock[0],
          });
          done();
        });
    });
    it('should response with a error', (done) => {
      request
        .get('/error')
        .end((error, res) => {
          assert.deepEqual(res.body, {});
          done();
        });
    });
  });
});
