'use strict';

const faker = require('faker');
const { num_fake_products } = require('../../config/index').db

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const defaultProducts = [];

        for (let i = 0; i < num_fake_products / 4; i++) {

            // Today
            defaultProducts.push({
                productName: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                defaultImg: faker.image.image(),
                dayMade: 'Today',
                createdAt: new Date('2/8/21')
            })

            // Yesterday
            defaultProducts.push({
                productName: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                defaultImg: faker.image.image(),
                dayMade: 'Yesterday',
                createdAt: new Date('2/7/21'),
            })

            defaultProducts.push({
                productName: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                defaultImg: faker.image.image(),
                dayMade: 'Last Week',
                createdAt: new Date('2/1/21')
            })

            defaultProducts.push({
                productName: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                defaultImg: faker.image.image(),
                dayMade: 'Last Month',
                createdAt: new Date('1/8/21')
            })
        }
        return queryInterface.bulkInsert('Products', defaultProducts, {})
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Products', null, { truncate: true, cascade: true, restartIdentity: true });
    }
};