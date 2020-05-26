const toDoPagination = async (model, query = {}, filters = {}) => {
  const { limit, page } = query;
  const total = await model.countDocuments(filters);
  return {
    total,
    pages: Math.ceil(total / limit),
    page: page || 1,
  };
};

module.exports = toDoPagination;
