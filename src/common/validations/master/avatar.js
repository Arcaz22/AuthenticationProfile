const joi = require('joi')

const avatarSchema = joi.object({
  user_id: joi.number().required(),
  avatar: joi.string().required()
})

module.exports = {
  avatarSchema
}
