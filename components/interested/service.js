const Interested = require('./model');
const { FieldsRequiredError } = require('../../utils/errors');


class InterestedService {
  constructor(model = Interested) {
    this.model = model;
  }

  async findAll(userId) {
    const interested = await this.model.find({ offerer: userId }).populate('applicant property');
    return interested;
  }

  async insert(applicantId, interested) {
    const { offerer, property } = interested;
    const applicant = String(applicantId);

    if (!offerer || !property || !interested) {
      throw new FieldsRequiredError('all fileds are requires', 400);
    }

    const query = { offerer, property, applicant };

    const existedInterested = await this.model.findOne(query);
    if (existedInterested !== null) throw new Error('this property added to interested');

    const createdInterested = await this.model.create(query);
    return createdInterested;
  }
}


module.exports = InterestedService;
