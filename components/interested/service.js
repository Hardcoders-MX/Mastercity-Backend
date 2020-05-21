const Interested = require('./model');
const { FieldsRequiredError, ServerError } = require('../../utils/errors');


class InterestedService {
  constructor(model = Interested) {
    this.model = model;
  }

  async findAll(userId) {
    const interested = await this.model.find({ offerer: userId, isDisable: false }).populate('applicant property');
    return interested;
  }

  async insert(applicantId, interested) {
    const { offerer, property } = interested;
    const applicant = String(applicantId);

    if (!offerer || !property || !interested) {
      throw new FieldsRequiredError('all fileds are requires', 400);
    }

    const query = {
      offerer, property, applicant, isDisable: false,
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
  }
}


module.exports = InterestedService;
