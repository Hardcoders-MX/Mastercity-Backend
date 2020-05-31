/* eslint-disable no-throw-literal */
/* eslint-disable class-methods-use-this */
const interestedMock = [
  {
    offerer: '123456',
    property: '591378',
    applicant: '852456',
    isDisable: false,
  },
];

class InterestedServiceMock {
  async findAll(userId, filters) {
    if (!userId || filters.error) throw false;
    const pagination = {};
    const interested = interestedMock[0];

    return { interested, pagination };
  }

  async insert(applicantId, interested) {
    const { offerer, property } = interested;
    if (!offerer || !property || !applicantId) throw false;

    return interestedMock[0];
  }

  async destroy(id) {
    if (id === 'error') throw false;
    return interestedMock[0];
  }
}

module.exports = { InterestedServiceMock, interestedMock };
