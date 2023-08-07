const request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');
const ProductImg = require('../models/ProductImg');
require('../models');

let token;
let productsId;

beforeAll(async () => {
  const credentials = {
    email: 'botUser@gmail.com',
    password: 'botuser123',
  };
  const res = await request(app).post('/users/login').send(credentials);
  token = res.body.token;
});

test('POST /products should create a products', async () => {
  const category = await Category.create({ name: 'tech' });
  const product = {
    title: ' GeForce RTX 3080 ROG STRIX GAMING OC',
    description:
      'La NVIDIA GeForce RTX 3080 es una tarjeta gráfica de alto rendimiento fabricada por NVIDIA. Forma parte de la serie RTX 30, que utiliza la arquitectura de GPU Ampere. La RTX 3080 está diseñada para ofrecer un rendimiento excepcional en juegos y tareas intensivas de gráficos y computación.',
    brand: 'ASUS-NVIDIA',
    price: '$ 419.99',
    categoryId: category.id,
  };
  const res = await request(app)
    .post('/products')
    .send(product)
    .set('Authorization', `Bearer ${token}`);
  productsId = res.body.id;
  await category.destroy();
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test('GET /products', async () => {
  const res = await request(app).get('/products');
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test('PUT /products/:id', async () => {
  const productsUpdated = {
    price: '$ 419.99',
  };
  const res = await request(app)
    .put(`/products/${productsId}`)
    .send(productsUpdated)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(productsUpdated.name);
});

test('GET /products/:id', async () => {
  const res = await request(app).get(`/products/${productsId}`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBe(productsId);
});

test('POST /products/:id/images should set the products images', async () => {
  const image = await ProductImg.create({
    url: 'http://rtx3080url.com',
    publicId: '3080 id',
  });
  const res = await request(app)
    .post(`/products/${productsId}/images`)
    .send([image.id])
    .set('Authorization', `Bearer ${token}`);
  await image.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test('DELETE /products/:id', async () => {
  const res = await request(app)
    .delete(`/products/${productsId}`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});
