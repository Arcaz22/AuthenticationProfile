const { user_profile } = require('../../../models')
const { avatarSchema } = require('../../../common/validations/master/avatar')
const { ERROR_MESSAGE } = require('../../../common/utils/constant')

const addAvatarProfile = async (payload) => {
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

    const updatedProfile = await user_profile.update(
      {
        avatar, // Hanya nama file, bukan URL
        updated_at: new Date()
      },
      {
        where: { user_id }
      }
    )

    return updatedProfile
  } catch (error) {
    console.error('Error in add avatar profile:', error)
    throw error
  }
}

module.exports = addAvatarProfile
