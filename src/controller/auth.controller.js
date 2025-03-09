const {
  sendSuccessResponse,
  sendCreatedResponse
} = require('../common/response/base-response')
const {
  getGoogleAuthUrl,
  handleGoogleCallback
} = require('../service/auth/google-auth')
const { SUCCESS_MESSAGE } = require('../common/utils/constant')
const signIn = require('../service/auth/sign_in')
const refreshTokens = require('../service/auth/refresh-token')
const logout = require('../service/auth/logout')
const signUp = require('../service/auth/sign_up')

const SignUpController = async (req, res, next) => {
  try {
    const response = await signUp(req.body)
    sendCreatedResponse(res, {
      message: SUCCESS_MESSAGE.USER_CREATED,
      data: response
    })
  } catch (error) {
    next(error)
  }
}

const SignInController = async (req, res, next) => {
  try {
    const response = await signIn(req.body)
    sendSuccessResponse(res, {
        message: SUCCESS_MESSAGE.USER_LOGGED_IN,
        data: response
    })
  } catch (error) {
    next(error)
  }
}

const RefreshTokenController = async (req, res, next) => {
  try {
    const { refresh_token } = req.body

    const response = await refreshTokens(refresh_token)
    sendSuccessResponse(res, {
        message: SUCCESS_MESSAGE.TOKEN_REFRESHED,
        data: response
    })
  } catch (error) {
    next(error)
  }
}

const LogoutController = async (req, res, next) => {
  try {
    const userId = req.user.id
    const response = await logout(userId)

    sendSuccessResponse(res,{
        message: SUCCESS_MESSAGE.USER_LOGGED_OUT,
        data: response
    })
  } catch (error) {
    next(error)
  }
}

const LoginWithGoogleController = (req, res) => {
  const authUrl = getGoogleAuthUrl()
  res.redirect(authUrl)
}

const HandleGoogleLoginCallbackController = async (req, res, next) => {
  try {
    const { code } = req.query

    const { user, accessToken } = await handleGoogleCallback(code)

    sendSuccessResponse(res, {
        message: SUCCESS_MESSAGE.USER_LOGGED_IN,
        user,
        accessToken
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  SignUpController,
  SignInController,
  RefreshTokenController,
  LogoutController,
  LoginWithGoogleController,
  HandleGoogleLoginCallbackController
}
