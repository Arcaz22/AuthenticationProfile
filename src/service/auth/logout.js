const { refresh_token } = require('../../models')

const logout = async (userId) => {
  try {
    await refresh_token.update(
      { is_revoked: true },
      { where: { user_id: userId } }
    )
    return { message: 'Logout successful' }
  } catch (error) {
    console.error('Error in logout:', error)
  }
}

module.exports = logout
