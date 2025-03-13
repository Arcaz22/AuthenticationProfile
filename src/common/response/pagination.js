const { DEFAULT_PAGE, DEFAULT_PER_PAGE } = require('../utils/constant')

const getPagination = (page = DEFAULT_PAGE, perPage = DEFAULT_PER_PAGE) => {
  const limit = perPage ? +perPage : DEFAULT_PER_PAGE
  const offset = page ? (page - 1) * limit : 0

  return { limit, offset }
}

const getPagingData = (
  data,
  page = DEFAULT_PAGE,
  perPage = DEFAULT_PER_PAGE
) => {
  const { count: totalItems, rows } = data
  const currentPage = page ? +page : DEFAULT_PAGE
  const totalPages = Math.ceil(totalItems / perPage)

  return {
    content: rows,
    pageable: {
      totalItems,
      totalPages,
      currentPage,
      pageSize: +perPage
    }
  }
}

module.exports = {
  getPagination,
  getPagingData
}
