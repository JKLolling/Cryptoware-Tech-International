const express = require('express');

const { asyncHandler } = require('./utils')
const { Product } = require('../db/models')
const router = express.Router();

/* GET home page. */
router.get('/', asyncHandler(async(req, res, next) => {
    const today = new Date('2/8/21').toISOString()
    const productsToday = await Product.findAll({
        where: { createdAt: today },
        order: [
            ['createdAt', 'ASC']
        ],
        limit: 10
    })

    const yesterday = new Date('2/7/21').toISOString()
    const productsYesterday = await Product.findAll({
        where: { createdAt: yesterday },
        order: [
            ['createdAt', 'ASC']
        ],
        limit: 10
    })

    const lastWeek = new Date('2/1/21').toISOString()
    const productsLastWeek = await Product.findAll({
        where: { createdAt: lastWeek },
        order: [
            ['createdAt', 'ASC']
        ],
        limit: 10
    })

    const lastMonth = new Date('1/8/21').toISOString()
    const productsLastMonth = await Product.findAll({
        where: { createdAt: lastMonth },
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