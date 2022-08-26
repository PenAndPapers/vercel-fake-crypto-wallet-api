const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
const defaultSecret = 'ThWmZq4t7w!z%C*F-JaNcRfUjXn2r5u8x/A?D(G+KbPeSgVkYp3s6v9y$B&E)H@McQfTjWmZq4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D(G+KbPeShVmYq3t6v9y$B&E)'
const defaultOTP = '999999'

router.post('/login', (req,res) => {
  try {
    const { email, password } = req.body
    const error = {}

    if (!email) error.email  = 'Email is required'
    if (email && !/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(email)) error.email = 'Email is not valid'
    if (!password) error.password =  'Password is required'
    if (Object.keys(error).length) return res.status(400).json({ error })

    // TODO user verification

    res.send({
      data: {
        email,
        isOtp: Math.floor(Math.random() * (10 - 1 + 1)) + 1
      }
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

router.post('/otp', (req,res) => {
  try {
    const { email, otp } = req.body
    const error = {}

    if (!otp) error.otp  = 'OTP is required'
    if (otp && otp !== defaultOTP) error.otp = 'OTP is not valid'
    if (!email) error.email  = 'Email is required'
    if (email && !/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(email)) error.email = 'Email is not valid'
    if (Object.keys(error).length) return res.status(400).json({ error })

    // TODO OTP verification

    res.send({
      data: {
        accessToken: jwt.sign({ email: req.body.email, date: new Date() }, defaultSecret)
      }
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

router.post('/register', async (req,res) => {
  try {
    const { first_name, last_name,  email, password } = req.body
    const error = {}

    if (!first_name) error.first_name = 'First name is required'
    if (!last_name) error.last_name = 'Last name is required'
    if (!email) error.email = 'Email is required'
    if (email && !/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(email)) error.email = 'Email is not valid'
    if (!password) error.password = 'Password is required'
    if (Object.keys(error).length) return res.status(400).json({ error })

    // TODO add logic user here

    res.send({
      data: {
        message: "A verification link has been sent to your email account."
      }
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

router.post('/forgot-password', async (req,res) => {
  try {
    const { email, } = req.body
    const error = {}

    if (!email) error.email = 'Email is required'
    if (email && !/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(email)) error.email = 'Email is not valid'
    if (Object.keys(error).length) return res.status(400).json({ error })

    // TODO verify email

    res.send({
      data: {
        message: "A password update link has been sent to your email account."
      }
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

module.exports = router