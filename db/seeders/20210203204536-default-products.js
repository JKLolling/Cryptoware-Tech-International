'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const num_fake_products = 50
    const defaultProducts = [];

    for (let i = 0; i < num_fake_products; i++) {
      defaultProducts.push({
        productName: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        defaultImg: faker.image.image()
      })
    }

    return queryInterface.bulkInsert('Products', defaultProducts, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
