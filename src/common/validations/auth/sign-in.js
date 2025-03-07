const joi = require('joi')

const signInSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required()
})

module.exports = signInSchema
