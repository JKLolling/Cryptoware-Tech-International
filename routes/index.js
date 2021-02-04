const express = require('express');

const { asyncHandler } = require('./utils')
const { Product } = require('../db/models')
const router = express.Router();

/* GET home page. */
router.get('/', asyncHandler(async(req, res, next) => {
    const productsToday = await Product.findAll({
        where: { dayMade: 'Today' },
        order: [
            ['createdAt', 'ASC']
        ],
        limit: 10
    })

    const productsYesterday = await Product.findAll({
        where: { dayMade: 'Yesterday' },
        order: [
            ['createdAt', 'ASC']
        ],
        limit: 10
    })

    const productsLastWeek = await Product.findAll({
        where: { dayMade: 'Last Week' },
        order: [
            ['createdAt', 'ASC']
        ],
        limit: 10
    })

    const productsLastMonth = await Product.findAll({
        where: { dayMade: 'Last Month' },
        order: [
            ['createdAt', 'ASC']
        ],
        limit: 10
    })

    const data = {
        productsToday,
        productsYesterday,
        productsLastWeek,
        productsLastMonth,
        title: 'Products'
    }
    res.render('index', data);
}))


module.exports = router;