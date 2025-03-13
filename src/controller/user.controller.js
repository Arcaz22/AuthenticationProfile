const { sendSuccessResponse } = require('../common/response/base-response')
const { SUCCESS_MESSAGE } = require('../common/utils/constant')
const { uploadFileToMinio } = require('../middlewares/multer-upload')
const addAvatarProfile = require('../service/master/user/add-avatar-profile')
const addProfile = require('../service/master/user/add-profile')
const getCurrentUser = require('../service/master/user/current-user')
const getAllUser = require('../service/master/user/get-all-user')
const updateAvatarProfile = require('../service/master/user/update-avatar-profile')
const updateProfile = require('../service/master/user/update-profile')

const GetCurrentUserController = async (req, res, next) => {
  try {
    const user_id = req.user.id
    const response = await getCurrentUser(user_id)

    return sendSuccessResponse(res, {
      message: SUCCESS_MESSAGE.CURRENT_USER_RETRIEVED,
      data: response
    })
  } catch (error) {
    next(error)
  }
}

const AddProfileController = async (req, res, next) => {
  try {
    const user_id = req.user.id

    const payload = {
      ...req.body,
      user_id
    }

    const response = await addProfile(payload)

    return sendSuccessResponse(res, {
      message: SUCCESS_MESSAGE.PROFILE_ADDED,
      data: response
    })
  } catch (error) {
    next(error)
  }
}

const UpdateProfileController = async (req, res, next) => {
  try {
    const user_id = req.user.id

    const payload = {
      ...req.body
    }

    const response = await updateProfile(user_id, payload)

    return sendSuccessResponse(res, {
      message: SUCCESS_MESSAGE.PROFILE_UPDATED,
      data: response
    })
  } catch (error) {
    next(error)
  }
}

const AddAvatarProfileController = async (req, res, next) => {
  try {
    const user_id = req.user.id
    const avatar = req.file

    const avatarFileName = await uploadFileToMinio(avatar)

    const payload = {
      user_id,
      avatar: avatarFileName
    }

    await addAvatarProfile(payload)

    return sendSuccessResponse(res, null, SUCCESS_MESSAGE.AVATAR_ADDED)
  } catch (error) {
    next(error)
  }
}

const GetAllUserController = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, search, role: roleFilter, sortOrder = 'ASC' } = req.query

    const filters = {
      search,
      roleFilter,
      sortOrder: sortOrder.toUpperCase()
    }

    const response = await getAllUser(
      parseInt(page),
      parseInt(perPage),
      filters
    )

    return sendSuccessResponse(res, response)
  } catch (error) {
    next(error)
  }
}

const UpdateAvatarProfileController = async (req, res, next) => {
  try {
    const user_id = req.user.id
    const avatar = req.file

    const avatarFileName = await uploadFileToMinio(avatar)

    const payload = {
      user_id,
      avatar: avatarFileName
    }

    const response = await updateAvatarProfile(payload)

    return sendSuccessResponse(res, {
      message: SUCCESS_MESSAGE.AVATAR_UPDATED,
      data: response
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  AddProfileController,
  GetCurrentUserController,
  UpdateProfileController,
  AddAvatarProfileController,
  GetAllUserController,
  UpdateAvatarProfileController
}
