const express = require('express');

const { asyncHandler } = require('./utils')
const { Product } = require('../db/models')
const router = express.Router();

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  const products = await Product.findAll({
    order: [['createdAt', 'ASC']],
    limit: 10
  })

  const data = {
    products,
    title: 'Products'
  }
  res.render('index', data);
}))


module.exports = router;
