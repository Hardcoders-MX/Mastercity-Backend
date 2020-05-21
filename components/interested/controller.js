class InterestedController {
  constructor(service = {}) {
    this.service = service;
  }

  index(req, res, next) {
    try {
      res.send('hello');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = InterestedController;
