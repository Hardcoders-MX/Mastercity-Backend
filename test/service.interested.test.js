/* eslint-disable no-undef */
const assert = require('assert');
const { InterestedModelMock, interestedMock } = require('../utils/mocks/InterestedMock');
const InterestedService = require('../components/interested/service');

describe('service - interested', () => {
  const model = new InterestedModelMock();
  const service = new InterestedService(model);

  describe('when findAll method is called', () => {
    it('should return a list of interested', async () => {
      const result = await service.findAll(interestedMock[0].applicant, {});
      const expected = {
        interested: interestedMock,
        pagination: {
          totalInterested: interestedMock.length,
          totalPages: 1,
          page: 1,
        },
      };
      assert.deepEqual(result, expected);
    });
  });

  describe('when inser method is called', () => {
    it('should return a new interested', async () => {
      const interested = {
        offerer: interestedMock[0].offerer,
        property: interestedMock[0].property,
      };
      const result = await service.insert(interestedMock[0].applicant, interested);
      const expected = interestedMock[0];
      assert.deepEqual(result, expected);
    });
  });
});
