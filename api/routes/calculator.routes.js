const router = require('express').Router()

router.get('/add', (req, res) => {
  return res.status(200).json({
    a: +req.query.a,
    b: +req.query.b,
    result: +req.query.a + +req.query.b,
  })
})

router.get('/sub', (req, res) => {
  return res.status(200).json({
    a: +req.query.a,
    b: +req.query.b,
    result: +req.query.a - +req.query.b,
  })
})

module.exports = router
