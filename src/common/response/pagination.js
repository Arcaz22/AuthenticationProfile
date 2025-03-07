const { DEFAULT_PAGE, DEFAULT_PER_PAGE } = require('../utils/constant')

exports.getPagination = function (
  page = DEFAULT_PAGE,
  perPage = DEFAULT_PER_PAGE
) {
  const pageIndex = Math.max(page - 1, 0)
  const limit = Math.max(perPage, 1)
  const offset = pageIndex * limit

  return {
    limit,
    offset
  }
}

exports.getPagingData = function (
  data,
  page = DEFAULT_PAGE,
  limit = DEFAULT_PER_PAGE
) {
  const { count: totalItems, rows: items } = data
  const currentPage = Math.max(page, 1)
  const totalPages = Math.ceil(totalItems / limit)

  return {
    totalItems,
    items,
    totalPages,
    currentPage
  }
}
