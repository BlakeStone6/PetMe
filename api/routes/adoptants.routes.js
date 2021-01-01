const router = require('express').Router()
const db = require('../db/connection')

router.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Hello, world!',
  })
})

router.post('/addAdoptant', (req, res) => {
  // console.log('REQ BODY TOP', req.body)

  db('adoptants').create(
    [
      {
        fields: req.body,
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err)
        console.log(req.body)
        return res.status(400).json({
          message: 'whoops',
        })
      }
      records.forEach(function (record) {
        console.log(req.body)
        return res.status(200).json({
          message: 'Successfully created user',
          id: record.id,
        })
      })
    }
  )
})

router.get('/adoptant', (req, res) => {
  db('adoptants').find(req.body.id, function (err, record) {
    if (err) {
      console.error(err)
      return
    }
    console.log('Retrieved', record.id)
  })
})

module.exports = router
