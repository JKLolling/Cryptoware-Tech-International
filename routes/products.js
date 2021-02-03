const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils')


router.get('/:id', asyncHandler(async (req, res) => {
    const product = await db.Product.findByPk(req.params.id, {
        include: ProductPhoto,
        include: Comment,
        include: ProductMaker
    })
    console.log(product);
    res.render('product', { product: product });
}))

module.exports = router;