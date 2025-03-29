const { user } = require('../../models')
const { EncryptPassword } = require('../../common/utils/password')
const { ERROR_MESSAGE } = require('../../common/utils/constant')
const { createAndStoreOTP } = require('../../common/utils/otp')
const signUpSchema = require('../../common/validations/auth/sign-up')
const transporter = require('../../config/mailer')
const rabbitmq = require('../../config/rabbitmq')

const signUp = async (payload) => {
  const { error } = signUpSchema.validate(payload, { abortEarly: false })
  if (error) {
    const validationErrors = error.details
      .map((detail) => detail.message)
      .join(', ')
    throw new Error(validationErrors)
  }

  const { username, email, password, confirm_password } = payload

  const [userExistByEmail, userExistByUsername] = await Promise.all([
    user.findOne({ where: { email } }),
    user.findOne({ where: { username } })
  ])

  if (userExistByEmail || userExistByUsername) {
    const error = new Error(
      userExistByEmail
        ? ERROR_MESSAGE.EMAIL_ALREADY_EXIST
        : ERROR_MESSAGE.USERNAME_ALREADY_EXIST
    )
    error.statusCode = 409
    throw error
  }

  if (password !== confirm_password) {
    const error = new Error(ERROR_MESSAGE.PASSWORD_NOT_MATCH)
    error.statusCode = 400
    throw error
  }

  const [hashedPassword, otpCode] = await Promise.all([
    EncryptPassword(password),
    createAndStoreOTP(email, 6, 15 * 60)
  ])

  const transaction = await user.sequelize.transaction()

  try {
    const newUser = await user.create(
      {
        username,
        email,
        password: hashedPassword,
        is_verified: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      { transaction }
    )

    await transporter
      .sendMail({
        from: `"Split Bill" <${process.env.EMAIL_USER}>`,
        to: newUser.email,
        subject: 'Verifikasi Akun Split Bill',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h1 style="color: #333; text-align: center;">Verifikasi Akun Split Bill</h1>
            <p style="color: #666;">Hai ${username},</p>
            <p style="color: #666;">Terima kasih telah mendaftar di platform Split Bill. Untuk menyelesaikan proses pendaftaran, silakan masukkan kode OTP berikut:</p>
            <div style="text-align: center; margin: 20px 0;">
              <h2 style="color: #4CAF50; letter-spacing: 10px; background-color: #f0f0f0; display: inline-block; padding: 10px 20px; border-radius: 5px;">${otpCode}</h2>
            </div>
            <p style="color: #666;">Kode OTP ini akan kadaluarsa dalam 15 menit.</p>
            <p style="color: #666; font-size: 0.9em;">Jika Anda tidak merasa mendaftar di Split Bill, silakan abaikan email ini.</p>
          </div>
        </div>
      `
      })
      .catch((error) => {
        console.error('Email sending failed:', error)
      })

    await rabbitmq.sendNotification(
      newUser.id,
      `Selamat datang di Split Bill, ${username}!`,
      'USER_SIGNUP'
    )

    await transaction.commit()

    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      is_verified: newUser.is_verified,
      message:
        'Pendaftaran berhasil. Silakan cek email Anda untuk verifikasi akun.'
    }
  } catch (error) {
    await transaction.rollback()
    console.error('Error in signUp:', error)
    throw error
  }
}

module.exports = signUp
