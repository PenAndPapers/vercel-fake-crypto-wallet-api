const express = require('express')
const router = express.Router()
const newsData = require('../mock/news')

// Get list
router.get('/', (req,res) => {
  res.send({
    data: newsData
  })
})

// Get by id
router.get('/:id', (req,res) => {
  res.send({
    data: newsData[Math.floor(Math.random() * 100)]
  })
})

module.exports = router