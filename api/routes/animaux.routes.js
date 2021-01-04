const router = require('express').Router()
const db = require('../db/connection')

router.get('/', (req, res) => {
  console.log('ici')
  const animaux = []
  db('animaux')
    .select({
      maxRecords: 100,
      view: 'Grid view',
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {
          animaux.push(record)
        })

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage()
      },
      function done(err) {
        if (err) {
          console.error(err)
          return res.status(500).json({
            message: 'Database error',
          })
        }
        return res.status(200).json({
          message: 'Successfully got a bunch of pets',
          animaux,
        })
      }
    )
})

module.exports = router
