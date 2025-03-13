const { Op } = require('sequelize')
const { user, role, user_profile } = require('../../../models')
const { generatePresignedUrl } = require('../../../config/minio')
const {
  getPagination,
  getPagingData
} = require('../../../common/response/pagination')

const getAllUser = async (page, perPage, filters = {}) => {
  try {
    const { limit, offset } = getPagination(page, perPage)
    const { search, roleFilter, sortBy = 'id', sortOrder = 'ASC' } = filters

    const whereConditions = {}
    if (search) {
      whereConditions[Op.or] = [
        { username: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ]
    }

    const includeConditions = [
      {
        model: user_profile,
        as: 'profile',
        attributes: ['full_name', 'phone', 'gender', 'avatar']
      },
      {
        model: role,
        as: 'roles',
        attributes: ['name'],
        through: { attributes: [] },
        ...(roleFilter && {
          where: {
            name: { [Op.iLike]: roleFilter }
          }
        })
      }
    ]

    const data = await user.findAndCountAll({
      where: whereConditions,
      attributes: ['id', 'username', 'email', 'is_verified'],
      include: includeConditions,
      limit,
      offset,
      order: [[sortBy, sortOrder]],
      distinct: true
    })

    const processedUsers = await Promise.all(
      data.rows.map(async (userData) => {
        const userObj = userData.toJSON()
        if (userObj.profile?.avatar) {
          userObj.profile.avatar = await generatePresignedUrl(
            userObj.profile.avatar
          )
        }
        return userObj
      })
    )

    const paginatedData = getPagingData(
      { count: data.count, rows: processedUsers },
      page,
      perPage
    )

    return {
      content: paginatedData.content,
      pageable: paginatedData.pageable,
      metadata: {
        filters: { search, roleFilter },
        sorting: { field: sortBy, direction: sortOrder }
      }
    }
  } catch (error) {
    console.error('Error in get all users:', error)
    throw error
  }
}

module.exports = getAllUser
