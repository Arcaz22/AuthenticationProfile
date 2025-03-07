const joi = require('joi')

const signUpSchema = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required().messages({
    'string.email': 'Email must be a valid email.'
  }),
  password: joi
    .string()
    .min(8)
    .max(100)
    .pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/)
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least one letter, one number, and one special character.'
    }),
  confirm_password: joi
    .string()
    .valid(joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords must match.'
    })
})

module.exports = signUpSchema
