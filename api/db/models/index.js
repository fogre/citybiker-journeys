const { Station, stationSchema } = require('./station')
const { Trip, tripSchema } = require('./trip')

Station.hasMany(Trip, {
  as: 'returnTrips',
  foreignKey: 'returnStation'
})
Station.hasMany(Trip, {
  as: 'departureTrips',
  foreignKey: 'departureStation'
})
Trip.belongsTo(Station, {
  as: 'return',
  foreignKey: 'returnStation'
})
Trip.belongsTo(Station, {
  as: 'departure',
  foreignKey: 'departureStation'
})

module.exports = {
  Station,
  stationSchema,
  Trip,
  tripSchema
}