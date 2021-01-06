const router = require('express').Router()
const db = require('../db/connection')

router.get('/', (req, res) => {
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
          // eslint-disable-next-line no-console
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

router.get('/:id', (req, res) => {
  getUninteractedPets(req.params.id)
    .then((animaux) => {
      // if all animals interacted
      if (!animaux.length)
        getUnlikedPets(req.params.id)
          .then((animaux) => {
            // if all animals liked
            if (!animaux.length)
              // just get all pets, they're here for fun anyways
              getAllPets()
                .then((animaux) => {
                  return res.status(200).json({
                    message: 'Successfully got all pets',
                    animaux,
                  })
                })
                .catch((e) => {
                  return res.status(500).json({
                    message: 'Could not retrieve any pets',
                    e,
                  })
                })
            else
              return res.status(200).json({
                message: 'Successfully got all unliked pets',
                animaux,
              })
          })
          .catch((e) => {
            return res.status(500).json({
              message: 'Could not retrieve unliked pets',
              e,
            })
          })
      else
        return res.status(200).json({
          message: 'Successfully got all unseen pets',
          animaux,
        })
    })
    .catch((e) => {
      return res.status(500).json({
        message: 'Could not retrieve unseen pets',
        e,
      })
    })
})

router.post('/like', (req, res) => {
  db('animaux').find(req.body.petId, function (err, record) {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      return res.status(500).json({
        message: 'Could not find pet',
      })
    }

    interact(record, req.body.userId)
    like(record, req.body.userId)
  })
  return res.status(200).json({
    message: 'liked',
  })
})

router.post('/reject', (req, res) => {
  db('animaux').find(req.body.petId, (err, record) => {
    if (err) {
      return res.status()
    }

    interact(record, req.body.userId)
    unlike(record, req.body.userId)

    return res.status(200).json({
      message: 'Pet rejected',
    })
  })
})

router.put('/pet', (req, res) => {
  const id = req.body.id
  const {
    nom,
    image,
    espece,
    dateDeNaissance,
    sexe,
    description,
    vaccin,
    puce,
    infosMedicales,
    refuge,
    taille,
    races,
  } = req.body.fields
  db('animaux').update(
    id,
    {
      nom,
      image,
      espece,
      dateDeNaissance,
      sexe,
      description,
      vaccin,
      puce,
      infosMedicales,
      refuge,
      taille,
      races,
    },
    function (err, record) {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        return res.status(400).json({
          message: 'Unable to update animal profile',
        })
      }
      return res.status(200).json({
        message: 'Successfully updated animal profile',
        id: record.id,
      })
    }
  )
})

const like = function (record, userId) {
  // if there's already been likes on this pet
  if (record.fields.likedBy) {
    const likedBy = record.fields.likedBy

    // add to likes only if user hasn't already liked this pet
    if (!likedBy.includes(userId)) likedBy.push(userId)
    db('animaux').update(record.id, {
      likedBy,
    })
  }
  // if pet hasn't been liked
  else {
    const likedBy = [userId]
    db('animaux').update(record.id, {
      likedBy,
    })
  }
}

const unlike = function (record, userId) {
  // if there's already been likes on this pet
  if (record.fields.likedBy) {
    const likedBy = record.fields.likedBy

    // remove from likes if user has already liked this pet
    if (likedBy.includes(userId)) {
      const userIndex = likedBy.indexOf(userId)
      likedBy.splice(userIndex, 1)
      db('animaux').update(record.id, {
        likedBy,
      })
    }
  }
  // if pet hasn't been liked, we don't care
}

const interact = function (record, userId) {
  // if there's already been interacts on this pet
  if (record.fields.seenBy) {
    const seenBy = record.fields.seenBy
    // update seenBy if user hadn't already seen this pet
    if (!seenBy.includes(userId)) seenBy.push(userId)
    db('animaux').update(record.id, {
      seenBy,
    })
  }
  // if pet hasn't been interacted with
  else {
    const seenBy = [userId]
    db('animaux').update(record.id, {
      seenBy,
    })
  }
}

const getUninteractedPets = function (id) {
  return new Promise((resolve, reject) => {
    const animaux = []
    db('adoptants').find(id, (err, record) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        return reject(err)
      }
      const email = record.fields.email
      db('animaux')
        .select({
          maxRecords: 1200,
          view: 'Grid view',
          filterByFormula: `NOT(FIND('${email}', ARRAYJOIN({seenBy}, ' ')))`,
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
              // eslint-disable-next-line no-console
              console.error(err)
              return reject(err)
            }
            resolve(animaux)
          }
        )
    })
  })
}

const getUnlikedPets = function (id) {
  return new Promise((resolve, reject) => {
    const animaux = []
    db('adoptants').find(id, (err, record) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        return reject(err)
      }
      const email = record.fields.email
      db('animaux')
        .select({
          maxRecords: 1200,
          view: 'Grid view',
          filterByFormula: `NOT(FIND('${email}', ARRAYJOIN({likedBy}, ' ')))`,
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
              // eslint-disable-next-line no-console
              console.error(err)
              return reject(err)
            }
            resolve(animaux)
          }
        )
    })
  })
}

const getAllPets = function () {
  return new Promise((resolve, reject) => {
    const animaux = []
    db('animaux')
      .select({
        maxRecords: 1200,
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
        function (err) {
          if (err) {
            // eslint-disable-next-line no-console
            console.error(err)
            return reject(err)
          }
          resolve(animaux)
        }
      )
  })
}

module.exports = router
