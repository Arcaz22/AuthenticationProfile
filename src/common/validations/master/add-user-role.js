const joi = require('joi')

const addUserRoleSchema = joi.object({
  user_id: joi.number().required(),
  role_id: joi.number().required()
})

module.exports = addUserRoleSchema
