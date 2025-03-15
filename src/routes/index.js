const express = require('express')

const auth = require('./auth')
const otp = require('./otp')
const user = require('./user')
const role = require('./role')

const router = express.Router()

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date(),
    service: 'auth-service',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  })
})

router.use('/auth', auth)
router.use('/otp', otp)
router.use('/user', user)
router.use('/role', role)

module.exports = router
