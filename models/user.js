const Joi = require('joi')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const user = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  token: {
    type: String,
    default: null
  },
  verify: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required ']
  }
})

const hashPassword = (pass) => {
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(pass, salt)
  return hashedPassword
}

const User = mongoose.model('user', user)

const userValidationSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
  token: Joi.string()
})

module.exports = { User, userValidationSchema, hashPassword }
