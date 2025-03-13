const { sendSuccessResponse } = require('../common/response/base-response')
const { SUCCESS_MESSAGE } = require('../common/utils/constant')
const addUserRole = require('../service/master/role/add-user-role')
const createRole = require('../service/master/role/create-role')
const getAllRole = require('../service/master/role/get-all-role')

const CreateRoleController = async (req, res, next) => {
  try {
    const { name } = req.body

    const response = await createRole({ name })

    return sendSuccessResponse(res, {
      message: SUCCESS_MESSAGE.ROLE_ADDED,
      data: response
    })
  } catch (error) {
    next(error)
  }
}

const GetAllRoleController = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, search, sortOrder = 'ASC' } = req.query

    const filters = {
      search,
      sortOrder: sortOrder.toUpperCase()
    }

    const response = await getAllRole(
      parseInt(page),
      parseInt(perPage),
      filters
    )

    return sendSuccessResponse(res, response)
  } catch (error) {
    next(error)
  }
}

const AddUserRoleController = async (req, res, next) => {
  try {
    const { user_id, role_id } = req.body

    const response = await addUserRole({ user_id, role_id })

    return sendSuccessResponse(res, {
      message: SUCCESS_MESSAGE.USER_ROLE_ADDED,
      data: response
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  CreateRoleController,
  GetAllRoleController,
  AddUserRoleController
}
