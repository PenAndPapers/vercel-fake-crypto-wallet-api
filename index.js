const express = require('express')

// import api's
const cryptoRoutes = require('./api/crypto')
const newsRoutes = require('./api/news')
const videoRoutes = require('./api/videos')

const app = express()
app.use(express.json())

app.use('/crypto', cryptoRoutes)
app.use('/news', newsRoutes)
app.use('/videos', videoRoutes)

const port = process.env.PORT || 9001
app.listen(port, () => console.log({ message: 'Server has been started', port: port }))
