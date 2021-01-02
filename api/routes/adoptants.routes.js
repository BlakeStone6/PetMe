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
          message: 'Unable to create user',
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

router.get('/:id', (req, res) => {
  console.log(req.params.id)
  db('adoptants').find(req.params.id, function (err, record) {
    if (err) {
      return res.status(400).json({
        message: 'Unable to fetch user',
      })
    }
    console.log('Retrieved', record.id)
    return res.status(200).json({
      message: 'Retrieved user',
      id: record.id,
      data: record.fields,
    })
  })
})

router.get('/:id/edit', (req, res) => {
  console.log(req.params.id)
  db('adoptants').find(req.params.id, function (err, record) {
    if (err) {
      return res.status(400).json({
        message: 'Unable to fetch user',
      })
    }
    console.log('Retrieved', record.id)
    return res.status(200).json({
      message: 'Retrieved user',
      id: record.id,
      data: record.fields,
    })
  })
})

router.put('/:id', (req, res) => {
  console.log(req.params.id)
  console.log(req.body)
  db('adoptants').update(
    [
      {
        id: req.params.id,
        fields: req.body,
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err)
        return res.status(400).json({
          message: 'Unable to edit user',
        })
      }
      records.forEach(function (record) {
        console.log(record.get('animauxPresents'))
        return res.status(200).json({
          message: 'Retrieved user',
          id: record.id,
          data: record.fields,
        })
      })
    }
  )
})

module.exports = router
