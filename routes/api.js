const express = require('express');

const { asyncHandler } = require('./utils')
const { Product, Comment } = require('../db/models')

const { Sequelize } = require('../db/models')
const router = express.Router();
const Op = Sequelize.Op;

router.get('/products/:day(Today|Yesterday|Last%20Week|Last%20Month)', asyncHandler(async(req, res) => {
    const day = req.params.day

    const moreProducts = await Product.findAll({
        where: { dayMade: day },
        limit: 35
    })

    res.json(moreProducts.slice(10))
}))


router.get('/products/keyword=:keyword', asyncHandler(async(req, res) => {

    const keyword = req.params.keyword
    let products

    products = await Product.findAll({
        where: {
            productName: {
                [Op.iLike]: `%${keyword}%`
            }
        }
    })
    res.json(products)

}))


router.get('/users/:id(\\d+)', asyncHandler(async(req, res) => {
    const userId = req.params.id
    let comments = await Comment.findAll({
        where: {
            userId
        },
        include: [
            Product
        ]
    })
    res.json(comments)
}))



module.exports = router;
router.post("/products/:id", asyncHandler(async(req, res) => {
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