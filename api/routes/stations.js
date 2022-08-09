const router = require('express').Router()

const { Station } = require('../db/models')

router.get('/', async (req, res) => {
  const stations = await Station.findAll()
  console.log(stations)
  res.json(stations)
})

module.exports = router