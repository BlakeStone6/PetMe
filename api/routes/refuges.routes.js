const router = require('express').Router()
const db = require('../db/connection')

router.get('/user', (req, res) => {
  return res.status(200).json({
    message: 'whatever',
    user: 'you?',
  })
})

router.get('/:id', (req, res) => {
  db('refuges').find(req.params.id, function (err, record) {
    if (err) {
      return res.status(400).json({
        message: 'Unable to fetch user',
      })
    }

    delete record.fields.password
    return res.status(200).json({
      message: 'Retrieved user',
      id: record.id,
      data: record.fields,
    })
  })
})

router.get('/:id/edit', (req, res) => {
  db('refuges').find(req.params.id, function (err, record) {
    if (err) {
      return res.status(400).json({
        message: 'Unable to fetch user',
      })
    }
    return res.status(200).json({
      message: 'Edited user',
      id: record.id,
    })
  })
})

router.get('/:id/animal/:animalId', (req, res) => {
  db('animaux').find(req.params.animalId, function (err, record) {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      return res.status(500).json({
        message: 'Database error',
      })
    }
    return res.status(200).json({
      message: 'Retrieved pet',
      record,
    })
  })
})

router.put('/:id', (req, res) => {
  db('refuges').update(
    {
      id: req.params.id,
      fields: req.body,
    },
    function (err, record) {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        return res.status(400).json({
          message: 'Unable to edit user',
        })
      }
      return res.status(200).json({
        message: 'Edited user',
        id: record.id,
      })
    }
  )
})

router.post('/addPet', async (req, res) => {
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
  } = req.body
  db('animaux').create(
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
          message: 'Unable to create animal profil',
        })
      }
      return res.status(200).json({
        message: 'Successfully created animal profil',
        id: record.id,
      })
    }
  )
})

module.exports = router
