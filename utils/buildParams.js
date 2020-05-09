/**
 * filter an object only with valid parameters
 * @param {Array} validParams
 * @param {Object} body
 */
const buildParams = (validParams, body) => {
  const params = {};

  validParams.forEach((attr) => {
    if (Object.prototype.hasOwnProperty.call(body, attr)) {
      params[attr] = body[attr];
    }
  });

  return params;
};

module.exports = buildParams;
