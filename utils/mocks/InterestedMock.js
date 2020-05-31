/* eslint-disable no-throw-literal */
/* eslint-disable class-methods-use-this */
const interestedMock = [
  {
    isDisabled: false,
    _id: '123456',
    user: '523648',
    property: 'myproperty',
    createdAt: '',
    updatedAt: '',
  },
];

class InterestedServiceMock {
  async findAll(userId, filters) {
    if (!userId || filters.error) throw false;
    const pagination = {};
    const interested = interestedMock[0];

    return { interested, pagination };
  }
}

module.exports = { InterestedServiceMock, interestedMock };

/* async insert(applicantId, interested) {
    const { offerer, property } = interested;
    const applicant = String(applicantId);

    if (!offerer || !property || !interested) {
      throw new FieldsRequiredError('all fileds are requires', 400);
    }

    const query = {
      offerer,
      property,
      applicant,
      isDisable: false,
    };

    const existedInterested = await this.model.findOne(query);
    if (existedInterested !== null) throw new Error('this property added to interested');

    const createdInterested = await this.model.create(query);
    return createdInterested;
  }

  async destroy(id) {
    const params = { isDisable: true };

    const deletedInterested = await this.model.updateOne({ _id: id, isDisable: false }, params);

    if (deletedInterested.nModified !== 1) {
      throw new ServerError('error to delete interested');
    }
    return deletedInterested;
  } */
