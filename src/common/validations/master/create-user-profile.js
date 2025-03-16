const joi = require('joi')
const Gender = require('../../enums/gender')
const { validatePhoneNumber } = require('../../utils/phone-format')

const createUserProfileSchema = joi.object({
  user_id: joi.number().required(),
  full_name: joi.string().required(),
  phone: joi
    .string()
    .custom((value, helpers) => {
      if (!validatePhoneNumber(value)) {
        return helpers.error('any.invalid')
      }
      return value
    })
    .required()
    .messages({
      'any.invalid': 'Nomor telepon tidak valid. Gunakan format: 8xx-xxxx-xxxx'
    }),
  gender: joi
    .string()
    .valid(...Object.values(Gender))
    .required()
    .messages({
      'any.only': 'Jenis kelamin tidak valid. Pilih di antara: Pria atau Wanita'
    })
})

module.exports = createUserProfileSchema
