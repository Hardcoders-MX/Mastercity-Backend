/* eslint-disable no-undef */
const assert = require('assert');
const proxyquire = require('proxyquire');
const testServer = require('../utils/testServer');
const { PropertiesService, PropertiesMock } = require('../utils/mocks/PropertiesMock');
const PassportMock = require('../utils/mocks/PassportMock');
const scopesValidationHandlerMock = require('../utils/mocks/scopesValidationHandlerMock');
const isOfThisTypeMock = require('../utils/mocks/isOfThisTypeMock');

describe('routes - properties', () => {
  const controller = proxyquire('../components/properties/controller', {
    './service': PropertiesService,
  });
  const router = proxyquire('../components/properties/routes', {
    './controller': controller,
    passport: PassportMock,
    '../../utils/middleware/scopesValidationHandler': scopesValidationHandlerMock,
    '../../utils/middleware/isOfThisType': isOfThisTypeMock,
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

  describe('POST /properties', () => {
    const data = { ...PropertiesMock[0] };
    it('should response with status code 200', (done) => {
      request
        .post('/')
        .send(data)
        .expect(201, done);
    });
    it('should response with a property created', (done) => {
      request
        .post('/')
        .send(data)
        .end((error, res) => {
          assert.deepEqual(res.body, {
            error: false,
            status: 201,
            message: 'property created',
            body: PropertiesMock[0],
          });
          done();
        });
    });
    it('should response with a error', (done) => {
      request
        .post('/')
        .send({ error: true })
        .end((error, res) => {
          assert.deepEqual(res.body, {});
          done();
        });
    });
  });

  describe('PATCH /properties/:id', () => {
    const updateData = {
      propertyType: 'house',
      rooms: 5,
      bathrooms: 2,
    };
    it('should response with status code 200', (done) => {
      request
        .patch(`/${PropertiesMock[0].id}`)
        .send(updateData)
        .expect(200, done);
    });
    it('should response with a property updated', (done) => {
      request
        .patch(`/${PropertiesMock[0].id}`)
        .send(updateData)
        .end((error, res) => {
          assert.deepEqual(res.body, {
            error: false,
            status: 200,
            message: 'property updated',
            body: updateData,
          });
          done();
        });
    });
    it('should response with a error', (done) => {
      request
        .patch(`/${PropertiesMock[0].id}`)
        .end((error, res) => {
          assert.deepEqual(res.body, {});
          done();
        });
    });
  });

  describe('DELETE /properties/:id', () => {
    it('should response with status code 200', (done) => {
      request.delete(`/${PropertiesMock[0].id}`).expect(200, done);
    });
    it('should response with a property updated', (done) => {
      request
        .delete(`/${PropertiesMock[0].id}`)
        .end((error, res) => {
          assert.deepEqual(res.body, {
            error: false,
            status: 200,
            message: 'property deleted',
            body: PropertiesMock[0].id,
          });
          done();
        });
    });
    it('should response with a error', (done) => {
      request
        .delete('/error')
        .end((error, res) => {
          assert.deepEqual(res.body, {});
          done();
        });
    });
  });

  describe('GET /properties/my', () => {
    it('should response with status code 200', (done) => {
      request.get('/my').expect(200, done);
    });
    it('should response with a properties listed', (done) => {
      request
        .get('/my')
        .end((error, res) => {
          assert.deepEqual(res.body, {
            error: false,
            status: 200,
            message: 'properties listed',
            body: PropertiesMock[0],
          });
          done();
        });
    });
    it('should response with a error', (done) => {
      request
        .get('/my')
        .query({ error: true })
        .end((error, res) => {
          assert.deepEqual(res.body, {
            body: {},
            error: false,
            message: 'property retrieved',
            status: 200,
          });
          done();
        });
    });
  });

  describe('GET /properties/unapprove', () => {
    it('should response with status code 200', (done) => {
      request.get('/unapproved').expect(200, done);
    });
    it('should response with a properties listed', (done) => {
      request
        .get('/unapproved')
        .end((error, res) => {
          assert.deepEqual(res.body, {
            error: false,
            status: 200,
            message: 'unapproved properties',
            body: PropertiesMock[0],
          });
          done();
        });
    });
    it('should response with a error', (done) => {
      request
        .get('/unapproved')
        .query({ error: true })
        .end((error, res) => {
          assert.deepEqual(res.body, {
            body: {},
            error: false,
            message: 'property retrieved',
            status: 200,
          });
          done();
        });
    });
  });
});
