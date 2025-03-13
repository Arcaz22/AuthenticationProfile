const express = require('express')

const auth = require('./auth')
const otp = require('./otp')
const user = require('./user')
const role = require('./role')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  })
})

router.use('/auth', auth)
router.use('/otp', otp)
router.use('/user', user)
router.use('/role', role)

module.exports = router
