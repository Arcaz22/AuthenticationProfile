const joi  = require('joi')

const roleSchema = joi.object({
    name: joi.string().required()
})

module.exports = roleSchema
