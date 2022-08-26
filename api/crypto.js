const express = require('express')
const router = express.Router()
const cryptoData = require('../mock/crypto')

// Get list
router.get('/', (req,res) => {
  res.send({
    data: cryptoData
  })
})

// Get by top movers
router.get('/top-movers', (req,res) => {
  const start = Math.floor(Math.random() * 20) + 1
  const end = start + 5
  res.send({
    data: cryptoData.slice(start, end)
  })
})

// Get by latest
router.get('/latest', (req,res) => {
  const start = Math.floor(Math.random() * 40) + 1
  const end = start + 5
  res.send({
    data: cryptoData.slice(start, end)
  })
})

// Get by new asset
router.get('/new-asset', (req,res) => {
  const start = Math.floor(Math.random() * 60) + 1
  const end = start + 25
  res.send({
    data: cryptoData.slice(start, end)
  })
})

module.exports = router