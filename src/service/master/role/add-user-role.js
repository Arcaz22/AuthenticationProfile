const { user_role, user, role } = require('../../../models')
const addUserRoleSchema = require('../../../common/validations/master/add-user-role')
const { ERROR_MESSAGE } = require('../../../common/utils/constant')

const addUserRole = async (payload) => {
  try {
    const { error } = addUserRoleSchema.validate(payload, { abortEarly: false })

    if (error) {
      throw new Error(error.message)
    }

    const { user_id, role_id } = payload

    const userExists = await user.findByPk(user_id)
    if (!userExists) {
      const error = new Error(ERROR_MESSAGE.USER_NOT_FOUND)
      error.statusCode = 404
      throw error
    }

    const roleExists = await role.findByPk(role_id)
    if (!roleExists) {
      const error = new Error(ERROR_MESSAGE.ROLE_NOT_FOUND)
      error.statusCode = 404
      throw error
    }

    const existingUserRole = await user_role.findOne({
      where: { user_id, role_id }
    })

    if (existingUserRole) {
      const error = new Error(ERROR_MESSAGE.USER_ROLE_EXISTS)
      error.statusCode = 400
      throw error
    }

    const newUserRole = await user_role.create({
      user_id,
      role_id
    })

    return newUserRole
  } catch (error) {
    console.error('Error in add user role:', error)
    throw error
  }
}

module.exports = addUserRole
