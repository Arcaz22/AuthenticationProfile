const { Op } = require('sequelize')
const { role } = require('../../../models')
const {
  getPagination,
  getPagingData
} = require('../../../common/response/pagination')

const getAllRole = async (page, perPage, filters = {}) => {
  try {
    const { limit, offset } = getPagination(page, perPage)
    const { search, sortBy = 'id', sortOrder = 'ASC' } = filters

    const whereConditions = {}
    if (search) {
      whereConditions[Op.or] = [{ name: { [Op.iLike]: `%${search}%` } }]
    }

    const data = await role.findAndCountAll({
      where: whereConditions,
      attributes: ['id', 'name'],
      limit,
      offset,
      order: [[sortBy, sortOrder]],
      distinct: true
    })

    const paginatedData = getPagingData(
      { count: data.count, rows: data.rows },
      page,
      perPage
    )

    return {
      content: paginatedData.content,
      pageable: paginatedData.pageable,
      metadata: {
        filters: { search },
        sorting: { field: sortBy, direction: sortOrder }
      }
    }
  } catch (error) {
    console.error('Error in get all roles:', error)
    throw error
  }
}

module.exports = getAllRole
