/* eslint-disable no-underscore-dangle */
const isOfThisType = (types) => (req, res, next) => {
  const { profileType } = req.user._doc;
  const hasAccess = types.filter((type) => type === profileType);

  if (hasAccess.length !== 1) {
    throw new Error('You don have permissions');
  }

  next();
};

module.exports = isOfThisType;
