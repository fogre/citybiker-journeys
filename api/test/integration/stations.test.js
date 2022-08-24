const supertest = require('supertest')
const app = require('../../index')

const api = supertest(app)
const route = '/api/stations'

describe('When using route /api/stations', () => {
  test('Get returns stations', async () => {
    const { body } = await api.get(route)
    expect(body.length).toBeTruthy()
    expect(body[0].id).toBeDefined()
    expect(body[2].name).toBeDefined()
  })

  test('Get returns correct stations with search req.query.stations', async () => {
    const { body } = await api.get(`${route}?station=rauta`)
    expect(body.length).toBeTruthy()
    body.forEach(station => {
      expect(station.name.toLowerCase().includes('rauta')).toBeTruthy()
    })
  })

  test('Get returns stations in correct order with ordering query params', async () => {
    const { body } = await api.get(`${route}?sort_by=name&order_by=ASC`)
    expect(body.length).toBeTruthy()
    for (let i = 0; i < body.length - 1; i++) {
      expect(body[i].name <= body[i+1].name).toBeTruthy()
    }
  })
})

describe('When using route /api/stations/:id', () => {
  test('Get returns station with valid params.id', async () => {
    const { body } = await api.get(`${route}/8`)
    expect(body.id).toBe(8)
    expect(body.name).toBeDefined()
    expect(body.address).toBeDefined()
    expect(body.coordinateX).toBeDefined()
    expect(body.coordinateY).toBeDefined()
  })

  test('Get returns 401 for faulty ID', async () => {
    await api.get(`${route}/12345`).expect(401)
  })
})

describe('When using route /api/stations/:id/statistics', () => {
  test('Get returns statistics in correct form', async () => {
    const { body } = await api.get(`${route}/13/statistics`)
    expect(body.id).toBe(13)
    expect(body.totalDepartures).toBe(6)
    expect(body.totalReturns).toBe(8)
    expect(body.avgDeparture).toBeDefined()
    expect(body.avgReturn).toBeDefined()
    expect(body.topDepartures.length).toBeLessThanOrEqual(5)
    expect(body.topReturns.length).toBeLessThanOrEqual(5)
    for (let i = 0; i < body.topDepartures.length - 1; i++) {
      expect(body.topDepartures[i].count)
        .toBeGreaterThanOrEqual(body.topDepartures[i+1].count)
    }
    for (let i = 0; i < body.topReturns.length - 1; i++) {
      expect(body.topReturns[i].count)
        .toBeGreaterThanOrEqual(body.topReturns[i+1].count)
    }
  })

  test('Get returns empty stats for station with no trips', async () => {
    const { body } = await api.get(`${route}/39/statistics`)
    expect(body.id).toBe(39)
    expect(body.totalDepartures).toBe(0)
    expect(body.totalReturns).toBe(0)
    expect(body.avgDeparture).toBeFalsy()
    expect(body.avgReturn).toBeFalsy()
    expect(body.topDepartures.length).toBe(0)
    expect(body.topReturns.length).toBe(0)
  })

  test('Get returns 401 for faulty ID', async () => {
    await api.get(`${route}/13334/statistics`).expect(401)
  })
})