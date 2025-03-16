const { role } = require('../../../models')
const roleSchema = require('../../../common/validations/master/role')
const { ERROR_MESSAGE } = require('../../../common/utils/constant')

const createRole = async (payload) => {
  try {
    const { error } = roleSchema.validate(payload, { abortEarly: false })

    if (error) {
      throw new Error(error.message)
    }

    const { name } = payload

    const existingRole = await role.findOne({
      where: { name }
    })

    if (existingRole) {
      const error = new Error(ERROR_MESSAGE.ROLE_ALREADY_EXISTS)
      error.statusCode = 400
      throw error
    }

    const newRole = await role.create({
      name
    })

    return newRole
  } catch (error) {
    console.error('Error in add role:', error)
    throw error
  }
}

module.exports = createRole
