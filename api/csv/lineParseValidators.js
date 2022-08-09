const { stationSchema, tripSchema } = require('../db/models')
/*
  parseValidators take a csv row/line object as a parameter
  Returns parsed object if valid or false if invalid
*/

/**
 * @description Returns parsed object if valid or false if invalid
 * @param {object} csvLine
 * @returns {object} StationFields
 * @returns false
 */
const stationParseValidator = csvLine => {
  const newStation = {
    id: csvLine.ID,
    address: csvLine.Osoite,
    name: csvLine.Nimi,
    coordinateX: csvLine.x,
    coordinateY: csvLine.y
  }
  const valid = stationSchema.validate(newStation)
  if (valid.error) {
    return false
  }
  return valid.value
}

/**
 * @description Returns parsed object if valid or false if invalid
 * @param {object} csvLine
 * @returns {object} TripFields
 * @returns false
 */
const tripParseValidator = csvLine => {
  const newTrip = {
    departureStation: csvLine['Departure station id'],
    returnStation: csvLine['Return station id'],
    distance: csvLine['Covered distance (m)'],
    time: csvLine['Duration (sec.)'],
    date: csvLine['Departure']
  }
  const valid = tripSchema.validate(newTrip)
  if (valid.error) {
    return false
  }
  return valid.value
}

module.exports = {
  stationParseValidator,
  tripParseValidator
}