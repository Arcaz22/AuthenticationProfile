module.exports = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 5,
  JWT_TOKEN_EXPIRED: '12h',
  JWT_REFRESH_TOKEN_EXPIRED: '7d',
  OTP_KEY_PREFIX: 'otp:',
  SUCCESS_MESSAGE: {},

  ERROR_MESSAGE: {
    USER_NOT_FOUND: 'User tidak ditemukan',
    INVALID_TOKEN: 'Invalid token',
    INVALID_CREDENTIALS: 'Username atau password salah',
    INVALID_REFRESH_TOKEN: 'Invalid refresh token',
    EMAIL_ALREADY_EXIST: 'Email sudah terdaftar',
    USERNAME_ALREADY_EXIST: 'Username sudah terdaftar',
    PASSWORD_NOT_MATCH: 'Password tidak sama',
    USER_NOT_VERIFIED: 'User belum terverifikasi',
    INVALID_OTP: 'OTP tidak valid',
  }
}
