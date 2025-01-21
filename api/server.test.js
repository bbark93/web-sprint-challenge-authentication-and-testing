const request = require("supertest");
const db = require("../data/dbConfig.js");
const server = require("./server.js");
const User = require("../api/users/users-model.js");

const user1 = { username: "bbark", password: "1234" };
const jokes = require('../api/jokes/jokes-data.js')

beforeAll(async () => {
  await db.migrate.rollback(); // so any changes to migration files are picked up
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("users").truncate();
});
afterAll(async () => {
  await db.destroy();
});

// Write your tests here
test("sanity", () => {
  expect(true).toBe(true);
});

describe("server.js", () => {
  test("should set testing environment", () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });
});

describe("[POST] /register", () => {
  describe("registers user", () => {
    it("adds user to the db", async () => {
      let users;
      const res = await request(server).post("/api/auth/register").send(user1);
      users = await db("users");
      expect(users).toHaveLength(1);
    });
    it("responds with correct status", async () => {
      const res = await request(server).post("/api/auth/register").send(user1);
      expect(res.status).toBe(201);
    });
  });
});

describe("[POST] /login", () => {
  describe("logs in user", () => {
    it("responds with the correct message on valid credentials", async () => {
      await request(server).post("/api/auth/register").send(user1);
      const res = await request(server).post("/api/auth/login").send(user1);
      expect(res.body.message).toMatch(/welcome bbark/i);
    });
    it("responds with the correct status", async () => {
      await request(server).post("/api/auth/register").send(user1);
      const res = await request(server).post("/api/auth/login").send(user1);
      expect(res.status).toBe(200);
    });
  });
});

describe('[GET] /jokes', () => {
  it('responds with correct message when token is not present', async () => {
    await request(server).post("/api/auth/register").send(user1);
    const res = await request(server).get('/api/jokes')
      expect(res.body.message).toMatch(/token required/i)
  })
  it('requests with a valid token obtain a list of users', async () => {
    await request(server).post("/api/auth/register").send(user1);
    let res = await request(server).post('/api/auth/login').send(user1)
    res = await request(server).get('/api/jokes').set('Authorization', res.body.token)
    expect(res.body).toMatchObject(jokes)
  })
})
