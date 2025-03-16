const { Router } = require('express')
const {
  SignUpController,
  SignInController,
  RefreshTokenController,
  LogoutController,
  LoginWithGoogleController,
  HandleGoogleLoginCallbackController
} = require('../controller/auth.controller')
const authorization = require('../middlewares/authorization')

const router = Router()

router.post('/signup', [], SignUpController)
router.post('/signin', [], SignInController)
router.post('/refresh-token', [authorization], RefreshTokenController)
router.get('/google', [], LoginWithGoogleController)
router.get('/google/callback', [], HandleGoogleLoginCallbackController)
router.post('/logout', [authorization], LogoutController)

module.exports = router
