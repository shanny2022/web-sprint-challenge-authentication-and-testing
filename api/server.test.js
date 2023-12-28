const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

beforeEach(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
  await request(server)
    .post('/api/auth/register') // updated here
    .send({
      username: 'tdubs',
      password: '1234'
    })
})

afterAll(async () => {
  await db.destroy()
})

describe('Auth Router', () => {
  test('sanity', () => {
    expect(true).toBe(true)
  })

  describe('[POST] /login', () => {
    let res

    test('responds with 200 OK', async () => {
      res = await request(server)
        .post('/api/auth/login') // updated here
        .send({
          username: 'tdubs',
          password: '1234'
        })
      expect(res.status).toBe(200)
    })

    test('responds with 401 invalid credentials', async () => {
      res = await request(server)
        .post('/api/auth/login') // updated here
        .send({
          username: 'tdu',
          password: '124'
        })
      expect(res.status).toBe(401)
    })
  })
})
