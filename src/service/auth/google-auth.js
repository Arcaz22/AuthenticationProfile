const { google } = require('googleapis')
const { oauth2Client } = require('../../config/google-config')
const { user } = require('../../models')
const { generateAccessToken } = require('../../common/utils/jwt')
const { EncryptPassword } = require('../../common/utils/password')
const { ExtractUsernameFromEmail } = require('../../common/utils/google')

const getGoogleAuthUrl = () => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ],
    prompt: 'consent'
  })
  console.log('authUrl:', authUrl)
  return authUrl
}

const handleGoogleCallback = async (code) => {
  try {
    const { tokens } = await oauth2Client.getToken(code)

    oauth2Client.setCredentials(tokens)

    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client })
    const { data } = await oauth2.userinfo.get()
    let existingUser = await user.findOne({ where: { email: data.email } })

    if (!existingUser) {
      existingUser = await user.create({
        username: ExtractUsernameFromEmail(data.email),
        email: data.email,
        password: await EncryptPassword('password'),
        is_verified: false
      })
    }

    const accessToken = generateAccessToken({
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email
    })

    return {
      user: existingUser,
      accessToken
    }
  } catch (error) {
    console.error('Error handling Google callback:', error)
    throw new Error('Failed to authenticate with Google')
  }
}

module.exports = {
  getGoogleAuthUrl,
  handleGoogleCallback
}
