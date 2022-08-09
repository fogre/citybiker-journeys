const {
  stationParseValidator,
  tripParseValidator
} = require('../../csv')


describe('When using stationParseValidator', () => {
  it('returns correct object for valid line', () => {
    const testLineObject = {
      ID: 1,
      Osoite: 'asddwa',
      Nimi: 'testPoo',
      x: '23.321',
      y: '32.432404'
    }

    const newStation = stationParseValidator(testLineObject)
    expect(newStation.id).toBe(1)
  })

  it('returns false for invalid line object', () => {
    const testLineObject = {
      ID: 1,
      Osoite: 'asddwa',
      x: '23.321',
      y: '32.432404'
    }
    expect(stationParseValidator(testLineObject)).toBe(false)
  })
})

describe('When using tripParseValidator', () => {
  it('returns correct object for valid line', () => {
    const testLineObject = {
      'Departure station id': 4,
      'Return station id': 2,
      'Covered distance (m)': 20,
      'Duration (sec.)': 30,
      'Departure': '2021-05-31T23:57:25'
    }

    const newStation = tripParseValidator(testLineObject)
    expect(newStation.departureStation).toBe(4)
    expect(newStation.returnStation).toBe(2)
    expect(newStation.distance).toBe(20)
    expect(newStation.time).toBe(30)
    expect(newStation.date).toBeDefined()
  })

  it('returns false for invalid line object', () => {
    const testLineObject = {
      'Departure station id': 4,
      'Return station id': 2,
      'Duration (sec.)': 30,
      'Departure': '2021-05-31T23:57:25'
    }
    expect(stationParseValidator(testLineObject)).toBe(false)
  })

  it('returns false when distance is < 10', () => {
    const testLineObject = {
      'Departure station id': 4,
      'Return station id': 2,
      'Covered distance (m)': 9,
      'Duration (sec.)': 30,
      'Departure': '2021-05-31T23:57:25'
    }
    expect(stationParseValidator(testLineObject)).toBe(false)
  })

  it('returns false when time is < 10', () => {
    const testLineObject = {
      'Departure station id': 4,
      'Return station id': 2,
      'Covered distance (m)': 20,
      'Duration (sec.)': 4,
      'Departure': '2021-05-31T23:57:25'
    }
    expect(stationParseValidator(testLineObject)).toBe(false)
  })
})