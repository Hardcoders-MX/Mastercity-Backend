const ApiKeys = require('./modelApiKeys');

/**
 * Get Api Keys by token
 * @param {*} token
 */
const getApiKey = async ({ token }) => {
  const apiKey = await ApiKeys.findOne({ token });
  if (!apiKey) throw new Error('not found');

  return apiKey;
};

module.exports = {
  getApiKey,
};
