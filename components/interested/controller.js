const InterestedService = require('./service');
const { success } = require('../../routes/response');

class InterestedController {
  constructor(service = new InterestedService()) {
    this.service = service;
    this.index = this.index.bind(this);
  }

  async index(req, res, next) {
    try {
      const interested = await this.service.findAll();
      success(res, 'interested listed', interested, 200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = InterestedController;
