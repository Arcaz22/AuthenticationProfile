const { verifyAccessToken } = require('../common/utils/jwt')
const { ERROR_MESSAGE } = require('../common/utils/constant')

const authorization = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error(ERROR_MESSAGE.MISSING_TOKEN)
    }

    const token = authHeader.split(' ')[1]

    const decoded = verifyAccessToken(token)

    req.user = decoded

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authorization
