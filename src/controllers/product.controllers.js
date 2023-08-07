const catchError = require('../utils/catchError');
const Product = require('../models/Product');
const Category = require('../models/Category');
const ProductImg = require('../models/ProductImg');

const getAll = catchError(async (req, res) => {
  const results = await Product.findAll({
    include: [
      {
        model: Category,
        attributes: ['name', 'id'],
      },
      {
        model: ProductImg,
      },
    ],
  });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Product.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Product.findByPk(id, {
    include: [ProductImg, Category],
  });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Product.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Product.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const setProductImages = catchError(async (req, res) => {
  const { id } = req.params;
  const products = await Product.findByPk(id);
  if (!products) return res.status(404).json({ message: 'Product not found' });
  await products.setProductImgs(req.body);
  const images = await products.getProductImgs();
  return res.json(images);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setProductImages,
};
