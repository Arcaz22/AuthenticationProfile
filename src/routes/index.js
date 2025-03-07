const express = require('express')

const auth = require('./auth')
const otp = require('./otp')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  })
})

router.use('/auth', auth)
router.use('/otp', otp)

module.exports = router
