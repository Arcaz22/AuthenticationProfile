const JWT = require('jsonwebtoken')
const { JWT_TOKEN_EXPIRED, JWT_REFRESH_TOKEN_EXPIRED } = require('./constant')

const generateAccessToken = (data) => {
  const key = process.env.JWT_SECRET_KEY
  const token = JWT.sign(data, key, { expiresIn: JWT_TOKEN_EXPIRED })
  return token
}

const generateRefreshToken = (data) => {
  const key = process.env.JWT_SECRET_KEY
  const token = JWT.sign(data, key, { expiresIn: JWT_REFRESH_TOKEN_EXPIRED })
  return token
}

const verifyAccessToken = (token) => {
  const key = process.env.JWT_SECRET_KEY
  const decoded = JWT.verify(token, key)
  return decoded
}

const verifyRefreshToken = (token) => {
  const key = process.env.JWT_SECRET_KEY
  const decoded = JWT.verify(token, key)
  return decoded
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
}
