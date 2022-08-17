const { connectToDatabase } = require('../db/sequelize')
const path = require('path')
const { Station, Trip } = require('../db/models')
const {
  insertCsvToDb,
  stationParseValidator,
  tripParseValidator
} = require('../csv')

/*
  ../../docker-compose.dev.yml needs to be running,as it provides the test database.
  This also makes sure the test DB can be connected into.
  Database is seeded with test data
*/
module.exports = async () => {
  await connectToDatabase()
  const stationFilePath = path.join(__dirname, 'testData', 'testStations.csv')
  await insertCsvToDb(Station, stationParseValidator, stationFilePath)
  const tripFilePath = path.join(__dirname, 'testData', 'testTrips.csv')
  await insertCsvToDb(Trip, tripParseValidator, tripFilePath)
}