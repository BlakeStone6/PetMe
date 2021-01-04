const router = require('express').Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const db = require('../../db/connection')

router.get('/user', (req, res) => {
  return res.status(200).json({
    message: 'whatever',
    user: 'you?',
  })
})

router.post('/adoptant/logout', (req, res) => {
  return res.status(200).json({
    message: 'Successfully logged out',
  })
})

router.post('/refuge/logout', (req, res) => {
  return res.status(200).json({
    message: 'Successfully logged out',
  })
})

router.post('/adoptant/login', (req, res) => {
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
      if (!userInDb)
        return res.status(401).json({
          message: 'Wrong email or password',
        })
      try {
        if (await argon2.verify(userInDb.fields.password, req.body.password)) {
          return res.status(200).json({
            message: 'OK',
            token: jwt.sign(
              {
                sub: userInDb.id,
                userType: 'adoptant',
              },
              process.env.JWT_SECRET
            ),
          })
        } else {
          // wrong password
          return res.status(401).json({
            message: 'Wrong email or password',
          })
        }
      } catch (err) {
        // internal failure
        // eslint-disable-next-line no-console
        console.error(err)
        return res.status(500).json({
          message: 'Internal server error',
          err,
        })
      }
    })
})

router.post('/refuge/login', (req, res) => {
  db('refuges')
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
      if (!userInDb)
        return res.status(401).json({
          message: 'Wrong email or password',
        })
      try {
        if (await argon2.verify(userInDb.fields.password, req.body.password)) {
          return res.status(200).json({
            message: 'OK',
            token: jwt.sign(
              {
                sub: userInDb.id,
                userType: 'refuge',
              },
              process.env.JWT_SECRET
            ),
          })
        } else {
          // wrong password
          return res.status(401).json({
            message: 'Wrong email or password',
          })
        }
      } catch (err) {
        // internal failure
        // eslint-disable-next-line no-console
        console.error(err)
        return res.status(500).json({
          message: 'Internal server error',
          err,
        })
      }
    })
})

router.post('/adoptant/register', async (req, res) => {
  req.body.password = await argon2.hash(req.body.password)
  db('adoptants').create(
    [
      {
        fields: req.body,
      },
    ],
    function (err, records) {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        return res.status(400).json({
          message: 'Unable to create user',
        })
      }
      records.forEach(function (record) {
        return res.status(200).json({
          message: 'Successfully created user',
          id: record.id,
        })
      })
    }
  )
})

router.post('/refuge/register', async (req, res) => {
  req.body.password = await argon2.hash(req.body.password)
  db('refuges').create(
    [
      {
        fields: req.body,
      },
    ],
    function (err, records) {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        return res.status(400).json({
          message: 'Unable to create user',
        })
      }
      records.forEach(function (record) {
        return res.status(200).json({
          message: 'Successfully created user',
          id: record.id,
        })
      })
    }
  )
})

module.exports = router
