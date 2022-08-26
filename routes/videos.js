const express = require('express')
const router = express.Router()
const videosData = require('../mock/videos')

// Get list
router.get('/', (req,res) => {
  res.send({
    data: videosData
  })
})

// Get by id
router.get('/:id', (req,res) => {
  res.send({
    data: videosData[Math.floor(Math.random() * 100)]
  })
})

module.exports = router