const router = require('express').Router()
const { Op } = require('sequelize')
const { Station, Trip } = require('../db/models')
const { paginationMw } = require('../middleware/customMiddleware')

router.get('/', paginationMw, async (req, res) => {
  const where = {}
  if (req.query.search) {
    const searchOp = { [Op.iLike]: `%${req.query.search}%` }
    where[Op.or] = [
      { time: searchOp },
      { distance: searchOp },
    ]
  }

  //const order = req.query.column && req.query.directon
   // ? [req.query.column, req.query.directon]
   // : ['date', 'DESC']

  const trips = await Trip.findAll({
    include: [
      {
        model: Station,
        as: 'return'
      },
      {
        model: Station,
        as: 'departure'
      }
    ],
    where,
    limit: req.limit,
    offset: req.offset,
  })
  res.json(trips)
})

module.exports = router