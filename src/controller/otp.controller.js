const verifyOtp = require('../service/master/otp/verify-otp')
const { sendSuccessResponse } = require('../common/response/base-response')
const { SUCCESS_MESSAGE } = require('../common/utils/constant')

const VerifyOtpController = async (req, res, next) => {
  try {
    const { email, otp } = req.body

    const response = await verifyOtp({ email, otp })
    sendSuccessResponse(res, {
      message: SUCCESS_MESSAGE.OTP_VERIFIED,
      data: response
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  VerifyOtpController
}
