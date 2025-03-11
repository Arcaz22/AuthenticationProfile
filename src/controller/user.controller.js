const { sendSuccessResponse } = require('../common/response/base-response')
const { SUCCESS_MESSAGE } = require('../common/utils/constant')
const { uploadFileToMinio } = require('../middlewares/multer-upload')
const addAvatarProfile = require('../service/master/user/add-avatar-profile')
const addProfile = require('../service/master/user/add-profile')
const getCurrentUser = require('../service/master/user/current-user')
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
    console.error('Error in UpdateProfileController:', error) // Log error jika ada
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

    return sendSuccessResponse(res, null, 'Avatar added successfully')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  AddProfileController,
  GetCurrentUserController,
  UpdateProfileController,
  AddAvatarProfileController
}
