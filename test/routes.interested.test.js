/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
const assert = require('assert');
const { InterestedRouter } = require('../components/interested/router');
const InterestedController = require('../components/interested/controller');
const { InterestedServiceMock, interestedMock } = require('../utils/mocks/InterestedMock');
const testServer = require('../utils/testServer');


describe('routes - interested', () => {
  const middlewares = {
    passport: { authenticate: () => (req, res, next) => next() },
    isOfThisType: () => (req, res, next) => {
      req.user = {
        _doc: {
          _id: 1,
        },
      };
      next();
    },
  };
  const controller = new InterestedController(new InterestedServiceMock());
  const router = new InterestedRouter(false, controller, middlewares);

  const request = testServer(router);

  describe('GET /interested', () => {
    it('should response with status code 200', (done) => {
      request.get('/').expect(200, done);
    });

    it('should response with a list of interested', (done) => {
      request.get('/')
        .end((error, res) => {
          assert.deepEqual(res.body, {
            error: false,
            status: 200,
            message: 'interested listed',
            body: {
              interested: interestedMock[0],
              pagination: {},
            },
          });
          done();
        });
    });

    it('should response with a error', (done) => {
      request.get('/?error=true')
        .end((error, res) => {
          assert.deepEqual(res.body, {});
          done();
        });
    });
  });

  describe('POST /interested', () => {
    const { offerer, property } = interestedMock[0];
    it('should response with status code 201', (done) => {
      request
        .post('/')
        .send({ offerer, property })
        .expect(201, done);
    });

    it('should response with a new interested', (done) => {
      request
        .post('/')
        .send({ offerer, property })
        .end((error, res) => {
          assert.deepEqual(res.body, {
            error: false,
            status: 201,
            message: 'interested created',
            body: interestedMock[0],
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

  describe('DELETE /interested/:id', () => {
    it('should response with status code 200', (done) => {
      request
        .delete(`/${interestedMock[0].offerer}`)
        .expect(200, done);
    });

    it('should response with a interested deleted', (done) => {
      request
        .delete(`/${interestedMock[0].offerer}`)
        .end((error, res) => {
          assert.deepEqual(res.body, {
            error: false,
            status: 200,
            message: 'interested deleted',
            body: interestedMock[0],
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
});
