const authenticate = (type, options) => {
  if (!type || !options) throw new Error();
  return (req, res, next) => next();
};

module.exports = {
  authenticate,
};
