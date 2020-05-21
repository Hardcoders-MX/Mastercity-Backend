const Interested = require('./model');

class InterestedService {
  constructor(model = Interested) {
    this.model = model;
  }

  async findAll(userId) {
    const interested = await this.model.find({ offeror: userId });
    return interested;
  }
}


module.exports = InterestedService;
