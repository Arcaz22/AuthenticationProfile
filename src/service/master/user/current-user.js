const { user, role, user_profile } = require('../../../models')
const { ERROR_MESSAGE } = require('../../../common/utils/constant')
const { generatePresignedUrl } = require('../../../config/minio')

const getCurrentUser = async (userId) => {
  try {
    const userData = await user.findOne({
      where: { id: userId },
      attributes: ['id', 'username', 'email', 'is_verified'],
      include: [
        {
          model: user_profile,
          as: 'profile',
          attributes: ['full_name', 'phone', 'gender', 'avatar']
        },
        {
          model: role,
          as: 'roles',
          attributes: ['name'],
          through: { attributes: [] }
        }
      ]
    })

    if (!userData) {
      const error = new Error(ERROR_MESSAGE.USER_NOT_FOUND)
      error.statusCode = 404
      throw error
    }

    if (userData.profile && userData.profile.avatar) {
      const avatarFileName = userData.profile.avatar
      const avatarUrl = await generatePresignedUrl(avatarFileName)

      userData.profile.avatar = avatarUrl
    }

    return userData
  } catch (error) {
    console.error('Error in get current user:', error)
    throw error
  }
}

module.exports = getCurrentUser
