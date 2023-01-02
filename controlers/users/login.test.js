const app = require('../../app');
const request = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config();

const { PORT = 3000, DB_HOST_TEST } = process.env;

describe('test login', () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach(done => {
    mongoose.connect(DB_HOST_TEST).then(() => done());
  });

  afterEach(done => {
    mongoose.connection.db.dropCollection('users', () => {
      mongoose.connection.close(() => done());
    });
  });

  test('user login test', async () => {
    const loginUser = {
      password: '123456',
      email: 'email3@email.com',
    };

    await request(app).post('/api/users/register').send(loginUser);
    const result = await request(app).post('/api/users/login').send(loginUser);
    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeTruthy();
    expect(result.body.data.user).toEqual(
      expect.objectContaining({
        subscription: expect.any(String),
        email: expect.any(String),
      })
    );
  });
});
