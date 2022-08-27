const express = require('express')
const router = express.Router()
const usersData = require('../mock/users')

// Get list
router.get('/', (req,res) => {
  res.send({
    data: usersData
  })
})

// Get by id
router.get('/:id', (req,res) => {
  res.send({
    data: usersData[0]
  })
})

module.exports = router