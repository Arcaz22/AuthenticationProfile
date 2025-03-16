const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const api = require('./routes')

require('dotenv').config()

const requestLogger = require('./middlewares/request-logger')
const errorHandler = require('./middlewares/error-handler')
const swaggerSetup = require('./config/swagger')
const { initializeMinioBucket } = require('./config/minio')

const app = express()

const corsOptions = {
  origin: 'http://localhost:3000', // Allow only Swagger UI (or frontend domain)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // HTTP methods allowed
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}

app.use(morgan('dev'))
app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())

app.use(requestLogger)
initializeMinioBucket()
swaggerSetup(app)

app.get('/', (req, res) => {
  res.json({
    message: 'WELCOME TO AUTH API',
    version: '1.0.0'
  })
})

app.use('/v1', api)

app.use(errorHandler)

module.exports = app
