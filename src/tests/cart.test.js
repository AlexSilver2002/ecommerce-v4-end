const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
require('../models');

let token;
let cartsId;

beforeAll(async () => {
  const credentials = {
    email: 'botUser@gmail.com',
    password: 'botuser123',
  };
  const res = await request(app).post('/users/login').send(credentials);
  token = res.body.token;
});

test('POST /carts should create a cart', async () => {
  const product = await Product.create({
    title: 'RX 6700 ',
    description: 'radeon rx 6700 12GB GDDDR6 ',
    brand: 'AMD',
    price: '$ 600',
  });
  const cart = {
    productsId: product.id,
    quantity: 5,
  };
  const res = await request(app)
    .post('/carts')
    .send(cart)
    .set('Authorization', `Bearer ${token}`);
  await product.destroy();
  cartsId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test('GET /carts', async () => {
  const res = await request(app)
    .get('/carts')
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test('PUT /carts/:id', async () => {
  const cartsUpdated = {
    quantity: 4,
  };
  const res = await request(app)
    .put(`/carts/${cartsId}`)
    .send(cartsUpdated)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.quantity).toBe(cartsUpdated.quantity);
});

test('DELETE /carts/:id', async () => {
  const res = await request(app)
    .delete(`/carts/${cartsId}`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});
