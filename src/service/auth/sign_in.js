const { user, refresh_token } = require('../../models')
const {
  generateAccessToken,
  generateRefreshToken
} = require('../../common/utils/jwt')
const { ComparePassword } = require('../../common/utils/password')
const {
  ERROR_MESSAGE,
  JWT_REFRESH_TOKEN_EXPIRED
} = require('../../common/utils/constant')
const signInSchema = require('../../common/validations/auth/sign-in')

const signIn = async (payload) => {
  try {
    const { error } = signInSchema.validate(payload, { abortEarly: false })
    if (error) {
      throw new Error(error.message)
    }

    const { username, password } = payload

    const userExist = await user.findOne({ where: { username },
      include: [
        {
          association: 'roles',
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      ]
    })
    if (!userExist) {
      const error = new Error(ERROR_MESSAGE.USER_NOT_FOUND)
      error.statusCode = 404
      throw error
    }

    const isValidPassword = await ComparePassword(password, userExist.password)
    if (!isValidPassword) {
      const error = new Error(ERROR_MESSAGE.INVALID_CREDENTIALS)
      error.statusCode = 401
      throw error
    }

    if (!userExist.is_verified) {
      const error = new Error(ERROR_MESSAGE.USER_NOT_VERIFIED)
      error.statusCode = 403
      throw error
    }

    const userRole = userExist.roles && userExist.roles.length > 0
      ? userExist.roles[0].name
      : null

    const accessToken = generateAccessToken({
      id: userExist.id,
      username: userExist.username,
      email: userExist.email,
      role: userRole
    })

    const refreshToken = generateRefreshToken({
      id: userExist.id
    })

    const refreshTokenExpiresIn = parseInt(JWT_REFRESH_TOKEN_EXPIRED, 10)
    const expiresAt = new Date(
      Date.now() + refreshTokenExpiresIn * 24 * 60 * 60 * 1000
    )

    await refresh_token.create({
      user_id: userExist.id,
      token: refreshToken,
      expires_at: expiresAt,
      is_revoked: false
    })

    return {
      user: {
        id: userExist.id,
        username: userExist.username,
        email: userExist.email,
        role: userRole
      },
      access_token: accessToken,
      refresh_token: refreshToken
    }
  } catch (error) {
    console.error('Error in signIn:', error)
    throw error
  }
}

module.exports = signIn
