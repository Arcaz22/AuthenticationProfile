const dayjs = require('dayjs')
const { v4: uuidv4 } = require('uuid')

const now = dayjs().unix()
const requestId = uuidv4()

const createResponse = (
  res,
  statusCode,
  data = null,
  message = 'Success',
  ex = null
) => {
  return res.status(statusCode).send({
    alert: {
      request_id: requestId,
      request_time_unix: now,
      code: statusCode,
      message,
      ex
    },
    data: data !== undefined ? data : null
  })
}

const sendPaginatedResponse = (
  res,
  data,
  paging,
  message = 'Success',
  ex = null
) => {
  const { totalItems, totalPages, currentPage } = paging
  return res.status(200).send({
    alert: {
      request_id: requestId,
      request_time_unix: now,
      code: 200,
      message,
      ex
    },
    paging: {
      totalItems,
      totalPages,
      currentPage
    },
    data
  })
}

const sendSuccessResponse = (res, data, message = 'Success') =>
  createResponse(res, 200, data, message)

const sendCreatedResponse = (
  res,
  data,
  message = 'Resource created successfully'
) => createResponse(res, 201, data, message)

const sendBadRequestResponse = (res, message = 'Bad Request', ex = null) =>
  createResponse(res, 400, null, message, ex)

const sendUnauthorizedResponse = (res, message = 'Unauthorized', ex = null) =>
  createResponse(res, 401, null, message, ex)

const sendForbiddenResponse = (res, message = 'Forbidden', ex = null) =>
  createResponse(res, 403, null, message, ex)

const sendInternalServerErrorResponse = (
  res,
  message = 'Internal Server Error',
  ex = null
) => createResponse(res, 500, null, message, ex)

module.exports = {
  sendSuccessResponse,
  sendCreatedResponse,
  sendBadRequestResponse,
  sendUnauthorizedResponse,
  sendForbiddenResponse,
  sendInternalServerErrorResponse,
  sendPaginatedResponse
}
