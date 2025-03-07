const errorHandler = (err, req, res, next) => {
  console.error(err.stack)

  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'

  if (err.name === 'JsonWebTokenError') {
    statusCode = 401
    message = 'Invalid token'
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401
    message = 'Token expired'
  }

  res.status(statusCode).send({
    alert: {
      request_id: req.requestId || 'unknown',
      request_time_unix: Math.floor(Date.now() / 1000),
      code: statusCode,
      message:
        process.env.NODE_ENV === 'production'
          ? 'An unexpected error occurred.'
          : message,
      ex: process.env.NODE_ENV === 'development' ? err.stack : undefined
    },
    data: null
  })
}

module.exports = errorHandler
