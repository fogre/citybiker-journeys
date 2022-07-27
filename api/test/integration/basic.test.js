const supertest = require('supertest')
const app = require('../../index')

const api = supertest(app)

describe('Test that api can be connected to', () => {
  test('App returns foobar', async () => {
    const res = await api.get('/')
    expect(res.status).toBe(200)
    expect(res.body.foo).toBe('bar')
  })
})