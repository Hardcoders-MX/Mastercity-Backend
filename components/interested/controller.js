const InterestedService = require('./service');
const { success } = require('../../routes/response');

class InterestedController {
  constructor(service = new InterestedService()) {
    this.service = service;
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  async index(req, res, next) {
    // eslint-disable-next-line no-underscore-dangle
    const offererId = req.user._doc._id;
    try {
      const interested = await this.service.findAll(offererId);
      success(res, 'interested listed', interested, 200);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    // eslint-disable-next-line no-underscore-dangle
    const applicantId = req.user._doc._id;
    const interested = req.body;
    try {
      const createdInterested = await this.service.insert(applicantId, interested);
      success(res, 'interested listed', createdInterested, 200);
    } catch (error) {
      next(error);
    }
  }

  async destroy(req, res, next) {
    const { id } = req.params;
    try {
      const deletedInterested = await this.service.destroy(id);
      success(res, 'interested deleted', deletedInterested, 200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = InterestedController;
