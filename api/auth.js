const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
const defaults = require('../default/index')

router.post('/login', (req,res) => {
  try {
    const { email, password } = req.body
    const error = {}

    if (!email) error.email  = 'Email is required'
    if (email && !/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(email)) error.email = 'Email is not valid'
    if (!password) error.password =  'Password is required'
    if (Object.keys(error).length) return res.status(400).json({ error })

    // TODO user verification
    
    const passwordHash = bcrypt.hashSync(password, 10)
    const requireOtp = ((Math.floor(Math.random() * (10 - 1 + 1)) + 1) > 5) ? true : false
    const authHash = requireOtp ? bcrypt.hashSync(email, 10) : null

    res.send({
      data: { email, requireOtp, authHash }
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
    if (otp && otp !== defaults.otp) error.otp = 'OTP is not valid'
    if (!email) error.email  = 'Email is required'
    if (email && !/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(email)) error.email = 'Email is not valid'
    if (Object.keys(error).length) return res.status(400).json({ error })

    // TODO OTP verification

    res.send({
      data: {
        accessToken: jwt.sign({ email: req.body.email, date: new Date() }, defaults.secret)
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

router.post('/update-password', async (req,res) => {
  try {
    const { password, confirmPassword } = req.body
    const error = {}

    if (!password) error.password = 'Password is required.'
    if (!confirmPassword) error.confirmPassword = 'Confirm password is required.'
    if (password && confirmPassword && (password !== confirmPassword)) error.password = 'Password is does not match.'
    if (Object.keys(error).length) return res.status(400).json({ error })

    res.send({
      data: {
        message: "Password has been updated."
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