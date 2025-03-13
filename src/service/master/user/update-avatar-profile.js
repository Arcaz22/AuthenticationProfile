const { user_profile } = require('../../../models')
const { avatarSchema } = require('../../../common/validations/master/avatar')
const { ERROR_MESSAGE } = require('../../../common/utils/constant')
const { deleteFileFromMinio } = require('../../../middlewares/multer-upload')

const updateAvatarProfile = async (payload) => {
  try {
    const { error } = avatarSchema.validate(payload, { abortEarly: false })
    if (error) {
      throw new Error(error.message)
    }

    const { avatar, user_id } = payload

    const existingProfile = await user_profile.findOne({
      where: { user_id }
    })

    if (!existingProfile) {
      const error = new Error(ERROR_MESSAGE.PROFILE_NOT_FOUND)
      error.statusCode = 404
      throw error
    }

    if (existingProfile.avatar) {
      await deleteFileFromMinio(existingProfile.avatar)
    }

    const updatedProfile = await user_profile.update(
      {
        avatar,
        updated_at: new Date()
      },
      {
        where: { user_id },
        returning: true
      }
    )

    return updatedProfile[1][0]
  } catch (error) {
    console.error('Error in update avatar profile:', error)
    throw error
  }
}

module.exports = updateAvatarProfile
