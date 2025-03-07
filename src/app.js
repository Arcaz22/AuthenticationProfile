const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const api = require('./routes')

require('dotenv').config()

const requestLogger = require('./middlewares/request-logger')
const errorHandler = require('./middlewares/error-handler')
const swaggerSetup = require('./config/swagger')

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.use(requestLogger)
swaggerSetup(app)

app.get('/', (req, res) => {
  res.json({
    message: 'WELCOME TO SSO API',
    version: '1.0.0'
  })
})

app.use('/v1', api)

app.use(errorHandler)

module.exports = app
