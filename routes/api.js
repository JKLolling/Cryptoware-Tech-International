const express = require('express');

const { asyncHandler } = require('./utils')
const { Product, Comment } = require('../db/models')
const router = express.Router();

router.get('/products/:day(Today|Yesterday|Last%20Week|Last%20Month)', asyncHandler(async (req, res) => {
  const day = req.params.day

  const moreProducts = await Product.findAll({
    where: { dayMade: day },
    limit: 20
  })

  res.json(moreProducts.slice(10))
}))





router.post("/products/:id", asyncHandler(async (req, res) => {
  const { comment, userId, productId } = req.body;
  console.log(req.body)
  const newComment = await Comment.create({
    comment: comment,
    productId: productId,
    userId: userId
  })

  res.json(newComment);
}));

module.exports = router;
