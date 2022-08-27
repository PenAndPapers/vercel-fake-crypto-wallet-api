require('dotenv').config()
const express = require('express')

// import api's
const authRoutes = require('./api/auth')
const cryptoRoutes = require('./api/crypto')
const newsRoutes = require('./api/news')
const videosRoutes = require('./api/videos')
const usersRoutes = require('./api/users')

const app = express()
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/crypto', cryptoRoutes)
app.use('/news', newsRoutes)
app.use('/videos', videosRoutes)
app.use('/users', usersRoutes)


//
//
//

const port = process.env.PORT || 3001
app.listen(port, () => console.log({ message: 'Server has been started', port: port }))
