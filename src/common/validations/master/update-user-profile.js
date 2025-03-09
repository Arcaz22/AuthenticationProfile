const joi = require('joi')
const Gender = require('../../enums/gender')
const { validatePhoneNumber } = require('../../utils/phone-format')

const updateUserProfileSchema = joi.object({
    full_name: joi.string(),
    phone: joi.string().custom((value, helpers) => {
        if (value && !validatePhoneNumber(value)) {
            return helpers.error('any.invalid')
        }
        return value
    }).messages({
        'any.invalid': 'Nomor telepon tidak valid. Gunakan format: 8xx-xxxx-xxxx'
    }),
    gender: joi.string().valid(...Object.values(Gender)).messages({
        'any.only': 'Jenis kelamin tidak valid. Pilih di antara: Pria atau Wanita'
    })
})

module.exports = updateUserProfileSchema
