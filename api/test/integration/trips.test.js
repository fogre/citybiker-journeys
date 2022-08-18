const supertest = require('supertest')
const app = require('../../index')

const api = supertest(app)
const route = '/api/trips'

describe('When using route /api/trips', () => {
  test('Get returns Trips', async () => {
    const res = await api.get(route)
    expect(res.body.length).toBeTruthy()
    const trip = res.body[0]
    expect(trip.return).toBeDefined()
    expect(trip.departure).toBeDefined()
  })

  test('Get returns Trips with limit when having req.query.limit', async () => {
    const res = await api.get(`${route}?limit=2`)
    expect(res.body.length).toBe(2)
  })

  test('Get returns Trips with offset when using req.query.offset', async () => {
    const res = await api.get(`${route}?limit=2&offset=2`)
    expect(res.body.length).toBe(2)
    const res2 = await api.get(`${route}?limit=2`)
    expect(res2.body[0].id).not.toBe(res.body[0].id)
    expect(res2.body[0].id).not.toBe(res.body[1].id)
    expect(res2.body[1].id).not.toBe(res.body[0].id)
    expect(res2.body[1].id).not.toBe(res.body[1].id)
  })

  test('Get returns Trips with correct stations with search req.query.station', async () => {
    const { body } = await api.get(`${route}?station=viiskulma`)
    expect(body).toBeDefined()
    expect(body.filter(t =>
      t.departure.name === 'Viiskulma' || t.return.name === 'Viiskulma'
    ).length).toBe(body.length)
  })

  test('Get returns Trips in correct order when using req.query.column and req.query.direction', async () => {
    const { body } = await api.get(`${route}?sort_by=id&order_by=ASC`)
    expect(body).toBeDefined()
    expect(body.length).toBeTruthy()
    for(let i = 0; i < body.length - 1; i++) {
      expect(body[i].id).toBeLessThan(body[i+1].id)
    }
  })

  test('Get returns filtered Trips when using req.query.filter', async () => {
    const { body } = await api.get(`${route}?filter=gte:distance:4000`)
    expect(body.length).toBeTruthy()
    expect(body.filter(t => t.distance >= 4000).length).toBe(body.length)
  })
})