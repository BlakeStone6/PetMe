const express = require('express')

const auth = require('./routes/auth')
const adoptantRoutes = require('./routes/adoptants.routes')
const refugeRoutes = require('./routes/refuges.routes')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Hello, world!',
  })
})

app.use('/auth', auth)
app.use('/adoptant', adoptantRoutes)
app.use('/refuge', refugeRoutes)

module.exports = app
