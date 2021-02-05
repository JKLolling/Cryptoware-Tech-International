const express = require('express');

const { asyncHandler } = require('./utils')
const { Product } = require('../db/models')
const router = express.Router();

router.get('/products/:day(Today|Yesterday|Last%20Week|Last%20Month)', asyncHandler(async (req, res) => {
  const day = req.params.day

  const moreProducts = await Product.findAll({
    where: { dayMade: day },
    limit: 20
  })

  res.json(moreProducts.slice(10))
}))

module.exports = router;
