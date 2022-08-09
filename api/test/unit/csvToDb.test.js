const path = require('path')
const { Station, Trip } = require('../../db/models')
const {
  insertCsvToDb,
  stationParseValidator,
  tripParseValidator
} = require('../../csv')

/*Empty Trip and Station table rows before testing*/
beforeAll(async () => {
  try {
    await Trip.sync({ force: true })
    await Station.sync({ force: true })
  } catch(e) {
    console.log('failed to drop the tables before csvToDB.test.js', e)
    process.exit(1)
  }
})

describe('When uploading station csv file to DB', () => {
  test('It inserts correct amount of tables to db', async () => {
    const filePath = path.join(__dirname, '..', 'testData', 'testStations.csv')
    await insertCsvToDb(Station, stationParseValidator, filePath)
    const stationsInDb = await Station.findAll({ raw: true })
    expect(stationsInDb.length).toBe(49)
    expect(stationsInDb[0].id).toBeDefined()
    expect(stationsInDb[3].name).toBeDefined()
  })
})

describe('When uploading trip csv file to DB', () => {
  test('It only bulk inserts valid Trips with correct fields', async () => {
    const filePath = path.join(__dirname, '..', 'testData', 'testTrips.csv')
    await insertCsvToDb(Trip, tripParseValidator, filePath)
    const tripsInDb = await Trip.findAll({ raw: true })
    expect(tripsInDb[0].date).toBeDefined()
    expect(tripsInDb[0].departureStation).toEqual(expect.any(Number))
    expect(tripsInDb[0].returnStation).toEqual(expect.any(Number))
    expect(tripsInDb.find(t => t.time >= 10)).toBeTruthy()
    expect(tripsInDb.find(t => t.distance < 10)).toBe(undefined)
    expect(tripsInDb.find(t => t.time < 10)).toBe(undefined)
  })
})