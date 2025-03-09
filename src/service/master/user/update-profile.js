const { user_profile } = require('../../../models')
const updateUserProfileSchema = require('../../../common/validations/master/update-user-profile')
const { ERROR_MESSAGE } = require('../../../common/utils/constant')
const { formatPhoneNumber } = require('../../../common/utils/phone-format')

const updateProfile = async (userId, payload) => {
  try {
    const { error } = updateUserProfileSchema.validate(payload, {
      abortEarly: false
    })
    if (error) {
      const validationError = new Error(error.message)
      validationError.statusCode = 400
      throw validationError
    }

    const { full_name, phone, gender } = payload

    const existingProfile = await user_profile.findOne({
      where: { user_id: userId }
    })

    if (!existingProfile) {
      const error = new Error(ERROR_MESSAGE.PROFILE_NOT_FOUND)
      error.statusCode = 404
      throw error
    }

    const formattedPhone = formatPhoneNumber(phone)

    const updatedProfile = await existingProfile.update({
      full_name,
      phone: formattedPhone,
      gender,
      updated_at: new Date()
    })

    return updatedProfile
  } catch (error) {
    console.error('Error in update profile:', error)
    throw error
  }
}

module.exports = updateProfile
