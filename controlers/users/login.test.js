const app = require('../../app');
const request = require('supertest');
require('dotenv').config();
const { Users } = require('../../models');
const bcrypt = require('bcryptjs');

const PASSWORD = bcrypt.hashSync('123456', bcrypt.genSaltSync(10));
const EMAIL = 'email3@email.com';
const SUBSCRIPTION = 'starter';
const ID = '63ad927c827b634b01f45bff';

describe('test login', () => {
  const user = {
    email: EMAIL,
    subscription: SUBSCRIPTION,
    _id: ID,
    password: PASSWORD,
  };

  const loginUser = {
    password: '123456',
    email: EMAIL,
  };

  test('test response status', async () => {
    jest.spyOn(Users, 'findOne').mockImplementationOnce(async () => user);

    jest
      .spyOn(Users, 'findByIdAndUpdate')
      .mockImplementationOnce(async () => null);
    const result = await request(app).post('/api/users/login').send(loginUser);
    expect(result.status).toBe(200);
  });

  test('test response token for existence', async () => {
    jest.spyOn(Users, 'findOne').mockImplementationOnce(async () => user);

    jest
      .spyOn(Users, 'findByIdAndUpdate')
      .mockImplementationOnce(async () => null);
    const result = await request(app).post('/api/users/login').send(loginUser);
    expect(result.body.data.token).toBeTruthy();
  });

  test('test response filds for conformity', async () => {
    jest.spyOn(Users, 'findOne').mockImplementationOnce(async () => user);

    jest
      .spyOn(Users, 'findByIdAndUpdate')
      .mockImplementationOnce(async () => null);
    const result = await request(app).post('/api/users/login').send(loginUser);
    expect(result.body.data.user).toEqual(
      expect.objectContaining({
        subscription: expect.any(String),
        email: expect.any(String),
      })
    );
  });
});

// ================= Version with DB==============

// const app = require('../../app');
// const request = require('supertest');
// const mongoose = require('mongoose');
// require('dotenv').config();
// const { Users } = require('../../models');
// const bcrypt = require('bcryptjs');

// const { PORT = 3000, DB_HOST_TEST } = process.env;

// describe('test login', () => {
//   let server;
//   beforeAll(() => (server = app.listen(PORT)));
//   afterAll(() => server.close());

//   beforeEach(done => {
//     mongoose.connect(DB_HOST_TEST).then(() => done());
//   });

//   afterEach(done => {
//     mongoose.connection.db.dropCollection('users', () => {
//       mongoose.connection.close(() => done());
//     });
//   });

//   test('user login test', async () => {
//     const hashedPassword = bcrypt.hashSync('123456', bcrypt.genSaltSync(10));

//     const newUser = {
//       password: hashedPassword,
//       email: 'email3@email.com',
//       subscription: 'starter',
//       avatarURL: '//www.gravatar.com/avatar/3d90921e1f00233b0f8b408e6ec74cbf',
//     };

//     await Users.create(newUser);

//     const loginUser = {
//       password: '123456',
//       email: 'email3@email.com',
//     };

//     const result = await request(app).post('/api/users/login').send(loginUser);
//     expect(result.status).toBe(200);
//     expect(result.body.data.token).toBeTruthy();
//     expect(result.body.data.user).toEqual(
//       expect.objectContaining({
//         subscription: expect.any(String),
//         email: expect.any(String),
//       })
//     );
//   });
// });
