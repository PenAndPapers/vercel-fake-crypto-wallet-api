const express = require('express')
const path = require('path')

// import routes
const cryptoRoutes = require('./routes/crypto')
const newsRoutes = require('./routes/news')
const videoRoutes = require('./routes/videos')

const app = express()

app.use(express.json())

app.use('/crypto', cryptoRoutes)
app.use('/news', newsRoutes)
app.use('/videos', videoRoutes)


app.listen(3001, () => console.log({ message: 'Server has been started'}))