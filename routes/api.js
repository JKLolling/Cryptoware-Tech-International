const express = require('express');

const { asyncHandler } = require('./utils')
const { Product } = require('../db/models')
const { Sequelize } = require('../db/models')
const router = express.Router();
const Op = Sequelize.Op;

router.get('/products/:day(Today|Yesterday|Last%20Week|Last%20Month)', asyncHandler(async (req, res) => {
  const day = req.params.day

  const moreProducts = await Product.findAll({
    where: { dayMade: day },
    limit: 35
  })

  res.json(moreProducts.slice(10))
}))

router.get('/products/keyword=:keyword', asyncHandler(async (req, res) => {
  const keyword = req.params.keyword

  const products = await Product.findAll({
    where: {
      productName: {
        [Op.substring]: keyword
      }
    }
  })

  res.json(products)
}))

module.exports = router;
