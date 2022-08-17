const router = require('express').Router()
const { Station, Trip } = require('../db/models')
const { paginationMw } = require('../middleware/customMiddleware')

router.get('/', paginationMw, async (req, res) => {
  const stations = await Station.findAll({
    include: [
      {
        model: Trip,
        as: 'returnTrips'
      }
    ],
    limit: req.limit,
    offset: req.offset
  })
  res.json(stations)
})

module.exports = router