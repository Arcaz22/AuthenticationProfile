const redisClient = require('../../config/redis')
const { OTP_KEY_PREFIX } = require('./constant')

const generateOTP = (length = 6) => {
  const min = Math.pow(10, length - 1)
  const max = Math.pow(10, length) - 1
  return Math.floor(min + Math.random() * (max - min + 1)).toString()
}

const storeOTP = async (email, otpCode, ttl = 15 * 60) => {
  await redisClient.set(`${OTP_KEY_PREFIX}${email}`, otpCode, { EX: ttl })
}

const getOTP = async (email) => {
  return await redisClient.get(`${OTP_KEY_PREFIX}${email}`)
}

const deleteOtp = async (email) => {
  await redisClient.del(`${OTP_KEY_PREFIX}${email}`)
}

const verifyOTP = async (email, otpInput) => {
  const otpStored = await getOTP(email)
  if (otpStored === otpInput) {
    await deleteOtp(email)
    return true
  } else {
    return false
  }
}

const createAndStoreOTP = async (email, length = 6, ttl = 15 * 60) => {
  const otpCode = generateOTP(length)
  await storeOTP(email, otpCode, ttl)
  return otpCode
}

module.exports = {
  storeOTP,
  getOTP,
  deleteOtp,
  verifyOTP,
  generateOTP,
  createAndStoreOTP
}
