const express = require('express')

// import api routes
const cryptoRoutes = require('./api/crypto')
const newsRoutes = require('./api/news')
const videoRoutes = require('./api/videos')

const app = express()

app.use(express.json())

app.use('/crypto', cryptoRoutes)
app.use('/news', newsRoutes)
app.use('/videos', videoRoutes)


app.listen(3001, () => console.log({ message: 'Server has been started', port: 3001 }))