const router = require('express').Router()
const { Op } = require('sequelize')
const { sequelize } = require('../db/sequelize')
const { Station, Trip } = require('../db/models')
const { paginationMw, orderMw } = require('../middleware/customMiddleware')

router.get('/', paginationMw, orderMw, async (req, res) => {
  const where = {}

  if (req.query.station) {
    where['name'] = { [Op.iLike]: `%${req.query.station}%` }
  }

  const stations = await Station.findAll({
    where,
    limit: req.limit,
    offset: req.offset,
    order: req.order
  })
  res.json(stations)
})

router.get('/:id', async (req, res) => {
  const station = await Station.findByPk(req.params.id)

  if (!station || !station.id) {
    return res.status(401).json({
      error: `Station ${req.params.id} not found`
    })
  }
  res.json(station)
})

/**
 * @description returns top stations sorted by id count
 * @param {Array} trips
 * @param {Boolean} isDepartureTrips
 * @returns {Array} topStations
 */
const getTopStations = (trips, isDepartureTrips) => {
  const temp = {}
  trips.forEach(s => {
    const tripType = isDepartureTrips ? s.return : s.departure
    temp[tripType.id]
      ? temp[tripType.id].count += 1
      : temp[tripType.id] = { id: tripType.id, name: tripType.name, count: 1 }
  })
  return Object.values(temp).sort((a, b) => b.count - a.count)
}

router.get('/:id/statistics', async (req, res) => {
  const station = await Station.findByPk(req.params.id, {
    attributes: {
      include: [
        [sequelize.fn('AVG', sequelize.col('departureTrips.distance')), 'avgDeparture'],
        [sequelize.fn('AVG', sequelize.col('returnTrips.distance')), 'avgReturn'],
      ]
    },
    include: [
      {
        model: Trip,
        as: 'departureTrips',
        attributes: ['id'],
        include: [{
          model: Station,
          as: 'return',
          attributes: ['id', 'name']
        }]
      },
      {
        model: Trip,
        as: 'returnTrips',
        attributes: ['id'],
        include: [{
          model: Station,
          as: 'departure',
          attributes: ['id', 'name']
        }]
      }
    ],
    group: [
      'station.id',
      'departureTrips.id',
      'departureTrips.return.id',
      'returnTrips.id',
      'returnTrips.departure.id'
    ]
  })

  if (!station || !station.id) {
    return res.status(401).json({
      error: `Station ${req.params.id} not found`
    })
  }

  const topDepartures = getTopStations(station.departureTrips, true).slice(0,5)
  const topReturns = getTopStations(station.returnTrips, false).slice(0,5)

  res.json({
    id: station.id,
    totalDepartures: station.departureTrips.length,
    totalReturns: station.returnTrips.length,
    avgDeparture: station.dataValues.avgDeparture,
    avgReturn: station.dataValues.avgReturn,
    topDepartures,
    topReturns
  })
})

module.exports = router