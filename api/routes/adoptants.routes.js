const router = require('express').Router()
const db = require('../db/connection')

router.get('/user', (req, res) => {
  return res.status(200).json({
    message: 'whatever',
    user: 'you?',
  })
})

router.get('/:id', (req, res) => {
  db('adoptants').find(req.params.id, function (err, record) {
    if (err) {
      return res.status(400).json({
        message: 'Unable to fetch user',
      })
    }
    delete record.fields.password
    return res.status(200).json({
      message: 'Retrieved user',
      id: record.id,
      fields: record.fields,
    })
  })
})

router.get('/:id/edit', (req, res) => {
  db('adoptants').find(req.params.id, function (err, record) {
    if (err) {
      return res.status(400).json({
        message: 'Unable to fetch user',
      })
    }
    return res.status(200).json({
      message: 'Retrieved user',
      id: record.id,
    })
  })
})

router.put('/:id', (req, res) => {
  db('adoptants').update(
    [
      {
        id: req.params.id,
        fields: req.body,
      },
    ],
    function (err, records) {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        return res.status(400).json({
          message: 'Unable to edit user',
        })
      }
      records.forEach(function (record) {
        return res.status(200).json({
          message: 'Edited user',
          id: record.id,
        })
      })
    }
  )
})

module.exports = router
