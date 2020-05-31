/* eslint-disable max-classes-per-file */
/* eslint-disable no-throw-literal */
/* eslint-disable class-methods-use-this */
const interestedMock = [{
  offerer: '123456',
  property: '591378',
  applicant: '852456',
  isDisable: false,
}];

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

class InterestedModelMock {
  constructor() {
    this.countDocuments = this.countDocuments.bind(this);
    this.populate = this.populate.bind(this);
    this.skip = this.skip.bind(this);
    this.sort = this.sort.bind(this);
    this.limit = this.limit.bind(this);
    this.find = this.find.bind(this);
  }

  countDocuments() {
    return interestedMock.length;
  }

  populate() {
    return interestedMock;
  }

  skip() {
    return { populate: this.populate };
  }

  sort() {
    return { skip: this.skip };
  }

  limit() {
    return { sort: this.sort };
  }

  find() {
    return { limit: this.limit };
  }

  findOne() {
    return null;
  }

  create() {
    return interestedMock[0];
  }

  updateOne() {}
}

module.exports = { InterestedServiceMock, InterestedModelMock, interestedMock };
