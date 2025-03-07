const { Router } = require('express')
const {
    VerifyOtpController
} = require('../controller/otp.controller')

const router = Router()

router.post('/verify', [], VerifyOtpController)

module.exports = router
