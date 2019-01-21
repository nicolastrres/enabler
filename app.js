const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yml')


const indexRouter = require('./routes/index')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/', indexRouter)

module.exports = app
