const router = require('express').Router()
const { Op } = require('sequelize')
const { Station, Trip } = require('../db/models')
const { paginationMw, orderMw, filteringMw } = require('../middleware/customMiddleware')

router.get('/', paginationMw, orderMw, filteringMw, async (req, res) => {
  const where = {}

  if (req.query.station) {
    const stationNameSearch = { [Op.iLike]: `%${req.query.station}%` }
    where[Op.or] = [
      { '$departure.name$': stationNameSearch },
      { '$return.name$': stationNameSearch },
    ]
  }
  if (req.filtering) {
    if (req.filtering.type === 'gte') {
      where[req.filtering.field] = { [Op.gte]: req.filtering.value }
    } else if (req.filtering.type === 'lte') {
      where[req.filtering.field] = { [Op.lte]: req.filtering.value }
    }
  }

  const trips = await Trip.findAll({
    include: [
      {
        model: Station,
        as: 'return',
        attributes: ['name']
      },
      {
        model: Station,
        as: 'departure',
        attributes: ['name']
      }
    ],
    where,
    limit: req.limit,
    offset: req.offset,
    order: req.order
  })
  res.json(trips)
})

module.exports = router