/* eslint-disable no-underscore-dangle */
const Interested = require('./model');
const { FieldsRequiredError, ServerError } = require('../../utils/errors');


class InterestedService {
  constructor(model = Interested) {
    this.model = model;
  }

  async findAll(userId, filters) {
    const limit = Number(filters.limit) || 10;
    const sortName = filters.sort_name ? String(filters.sort_name) : '_id';
    const sort = Number(filters.sort) || -1;
    const skip = (Number(filters.page || 1) - 1) * limit;

    const query = { $or: [{ offerer: userId }, { applicant: userId }], isDisable: false };

    const preInterested = await this.model
      .find(query)
      .limit(limit)
      .sort({
        [sortName]: sort,
      }).skip(skip)
      .populate('applicant property offerer');

    const interested = preInterested.map((doc) => {
      const inter = { ...doc };
      if (doc._doc && doc._doc.offerer && doc._doc.applicant) {
        inter._doc.offerer.password = '';
        inter._doc.applicant.password = '';
        return inter._doc;
      }
      return doc;
    });

    const totalInterested = await this.model.countDocuments(query);
    const pagination = {
      totalInterested,
      totalPages: Math.ceil(totalInterested / limit),
      page: filters.page || 1,
    };

    return { interested, pagination };
  }

  async insert(applicantId, interested) {
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
    return false;
  }
}


module.exports = InterestedService;
