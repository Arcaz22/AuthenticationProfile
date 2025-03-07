const { user } = require('../../../models')
const { verifyOTP } = require('../../../common/utils/otp')
const { ERROR_MESSAGE } = require('../../../common/utils/constant')

const verifyOtp = async (payload) => {
  const { email, otp } = payload

  const isOTPValid = await verifyOTP(email, otp)

  if (!isOTPValid) {
    const error = new Error(ERROR_MESSAGE.INVALID_OTP)
    error.statusCode = 400
    throw error
  }

  const existingUser = await user.findOne({ where: { email } })

  if (!existingUser) {
    const error = new Error(ERROR_MESSAGE.USER_NOT_FOUND)
    error.statusCode = 404
    throw error
  }

  const transaction = await user.sequelize.transaction()

  try {
    await user.update(
      {
        is_verified: true,
        updated_at: new Date()
      },
      {
        where: { email },
        transaction
      }
    )

    await transaction.commit()

    return {
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email,
      is_verified: true,
      message: 'Akun berhasil diverifikasi'
    }
  } catch (error) {
    await transaction.rollback()
    console.error('Error in OTP verification:', error)
  }
}

module.exports = verifyOtp
