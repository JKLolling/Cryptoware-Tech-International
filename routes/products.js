const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils')


router.get('/:id', asyncHandler(async (req, res) => {
    const product = await db.Product.findByPk(req.params.id, {
        include: [
            {
                model: db.Comment,
                include: [db.User]
            },
            db.ProductPhoto, db.User
        ]
    })

    res.render('product', { product, commentArr: product.Comments, photosArr: product.ProductPhotos, userArr: product.Users });
}))

module.exports = router;
