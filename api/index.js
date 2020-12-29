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

app.use('/adoptants', adoptantRoutes)

app.get(
  '/secret/:key',
  (req, res, next) => {
    if (req.params.key !== 'hello') {
      return res.status(401).json({
        message: "It's top secret, you need the right password you dumb dumb",
      })
    }

    next()
  },
  (req, res) => {
    return res.status(200).json({
      message: 'TOP SECRET',
    })
  }
)

module.exports = app
