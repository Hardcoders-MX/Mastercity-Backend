const isOfThisTypeMock = () => (req, res, next) => {
  req.user = {
    _doc: {
      _id: 1,
    },
  };

  next();
};

module.exports = isOfThisTypeMock;
