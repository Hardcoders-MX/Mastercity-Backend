const setupPagination = (query = {}) => {
  const limit = Number(query.limit) || 10;
  const sortName = query.sort_name ? String(query.sort_name) : '_id';
  const sortValue = Number(query.sort) || -1;
  const skip = (Number(query.page || 1) - 1) * limit;

  return {
    limit,
    skip,
    sort: {
      [sortName]: sortValue,
    },
    page: query.page || 1,
  };
};

module.exports = setupPagination;
