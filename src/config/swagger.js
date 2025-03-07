const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const basicAuth = require('express-basic-auth')

const swaggerOption = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'SSO API',
      version: '1.0.0',
      description: 'A simple SSO API',
      contact: {
        name: 'arcaz22',
        email: 'chandraarcychan@gmail.com'
      }
    },
    servers: [
      {
        url: process.env.LOCAL_URL,
        description: 'Local server'
      },
      {
        url: process.env.DEVELOPMENT_URL,
        description: 'Development server'
      },
      {
        url: process.env.PRODUCTION_URL,
        description: 'Production server'
      }
    ]
  },
  apis: ['./src/routes/swagger/**/*.js']
}

const swaggerSpec = swaggerJSDoc(swaggerOption)

const swaggerSetup = (app) => {
  app.use(
    '/docs',
    basicAuth({
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASS
      },
      challenge: true
    }),
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  )
}

module.exports = swaggerSetup
