const request = require('supertest')
const db = require('../data/dbConfig.js')
const server = require('./server.js')

// beforeAll(async () => {
//   await db.migrate.rollback() // so any changes to migration files are picked up
//   await db.migrate.latest()
// })

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

describe('server.js', () => {
  test('should set testing environment', () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

// describe('[POST] /register', () => {
//   test('registers a new user', () ={

//   })
// })
