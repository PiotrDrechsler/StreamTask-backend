const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')

dotenv.config()

const router = require('./routes/routes')
const { connectDatabase } = require('./startup/database.js')

connectDatabase()

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(cookieParser())
app.use(express.json())
app.use(morgan(formatsLogger))
app.use(router)
app.use(cors())
app.use(express.static('./public'))

app.use((req, res) => {
  res.status(404).send('Not found!')
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Something went wrong!'
  return res.status(status).json({
    sucess: false,
    status,
    message
  })
})

module.exports = app
