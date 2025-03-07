const { user, refresh_token } = require('../../models')
const {
  verifyRefreshToken,
  generateAccessToken
} = require('../../common/utils/jwt')
const { ERROR_MESSAGE } = require('../../common/utils/constant')

const refreshToken = async (token) => {
  try {
    verifyRefreshToken(token)

    const storedToken = await refresh_token.findOne({
      where: { token, is_revoked: false },
      include: [{ model: user, as: 'user' }]
    })

    if (!storedToken) {
      throw new Error(ERROR_MESSAGE.INVALID_REFRESH_TOKEN)
    }

    if (new Date(storedToken.expires_at) < new Date()) {
      throw new Error(ERROR_MESSAGE.INVALID_REFRESH_TOKEN)
    }

    const accessToken = generateAccessToken({
      id: storedToken.user.id,
      username: storedToken.user.username,
      email: storedToken.user.email
    })

    return {
      access_token: accessToken
    }
  } catch (error) {
    console.error('Error in refreshToken:', error)
    throw error
  }
}

module.exports = refreshToken
