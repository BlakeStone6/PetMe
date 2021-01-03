const express = require('express')

const adoptantRoutes = require('./routes/adoptants.routes')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Hello, world!',
  })
})

app.use('/adoptant', adoptantRoutes)

module.exports = app
