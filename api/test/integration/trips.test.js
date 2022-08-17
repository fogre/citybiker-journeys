const supertest = require('supertest')
const app = require('../../index')

const api = supertest(app)
const route = '/api/trips'

describe('When using route /api/trips', () => {
  test('Get returns Trips with limit even if there is no req.query.limit', async () => {
    const res = await api.get(route)
    expect(res.body.length).toBeLessThan(100)
  })

  test('Get returns Trips with limit when having req.query.limit', async () => {
    const res = await api.get(`${route}?limit=2`)
    expect(res.body.length).toBe(2)
  })

  test('Get returns Trips with offset when using req.query.offset', async () => {
    const res = await api.get(`${route}?limit=2&offset=2`)
    console.log(res.body)
    expect(res.body.length).toBe(2)
    const res2 = await api.get(`${route}?limit=2`)
    expect(res2.body[0].id).not.toBe(res.body[0].id)
    expect(res2.body[0].id).not.toBe(res.body[1].id)
    expect(res2.body[1].id).not.toBe(res.body[0].id)
    expect(res2.body[1].id).not.toBe(res.body[1].id)
  })
})