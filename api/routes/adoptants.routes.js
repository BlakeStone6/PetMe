const router = require('express').Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const db = require('../db/connection')

router.post('/login', (req, res) => {
  console.log(`got to love ya `)
  db('adoptants')
    .select({
      view: 'Grid view',
      filterByFormula: `{email} = '${req.body.email}'`,
    })
    .firstPage(async function (err, records) {
      if (err) {
        return res.status(500).json({
          message: 'not ok',
          err,
        })
      }
      const userInDb = records[0]
      try {
        if (await argon2.verify(userInDb.fields.password, req.body.password)) {
          return res.status(200).json({
            message: 'ok',
            token: jwt.sign(
              {
                sub: userInDb.id,
              },
              process.env.JWT_SECRET
            ),
          })
        } else {
          return res.status(401).json({
            message: 'no',
          })
        }
      } catch (err) {
        // internal failure
        console.error(err)
        return res.status(500).json({
          message: 'not ok',
          err,
        })
      }
    })
})

router.post('/register', async (req, res) => {
  req.body.password = await argon2.hash(req.body.password)
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
    console.log('Retrieved', record.fields)
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
