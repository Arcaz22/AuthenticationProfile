const verifyOtp = require('../service/master/otp/verify-otp')
const { sendSuccessResponse } = require('../common/response/base-response')

const VerifyOtpController = async (req, res, next) => {
  try {
    const { email, otp } = req.body

    const response = await verifyOtp({ email, otp })
    sendSuccessResponse(res, response)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  VerifyOtpController
}
