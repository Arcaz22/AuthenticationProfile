const { user_profile } = require('../../../models')
const createUserProfileSchema = require('../../../common/validations/master/create-user-profile')
const { ERROR_MESSAGE } = require('../../../common/utils/constant')
const { formatPhoneNumber } = require('../../../common/utils/phone-format')

const addProfile = async (payload) => {
  try {
    const { error } = createUserProfileSchema.validate(payload, {
      abortEarly: false
    })
    if (error) {
      throw new Error(error.message)
    }

    const { full_name, phone, gender, user_id } = payload

    const existingProfile = await user_profile.findOne({
      where: { user_id }
    })

    if (existingProfile) {
      const error = new Error(ERROR_MESSAGE.PROFILE_ALREADY_EXIST)
      error.statusCode = 409
      throw error
    }

    const formattedPhone = formatPhoneNumber(phone)

    const newProfile = await user_profile.create({
      user_id,
      full_name,
      phone: formattedPhone,
      gender,
      created_at: new Date()
    })

    return newProfile
  } catch (error) {
    console.error('Error in add profile:', error)
    throw error
  }
}

module.exports = addProfile
