const request = require('supertest');
const app = require('../app');
require('../models');

let token;
let purchaseId;

beforeAll(async () => {
  const credentials = {
    email: 'botUser@gmail.com',
    password: 'botuser123',
  };
  const res = await request(app).post('/users/login').send(credentials);
  token = res.body.token;
});

test('GET /purchases', async () => {
  const res = await request(app)
    .get('/purchases')
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
});
