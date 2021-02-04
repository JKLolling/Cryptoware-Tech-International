'use strict';

const faker = require('faker');

const { num_fake_users, num_fake_products } = require('../../config/index').db

// Returns random int between min and max
const randomInt = (max, min) => {
  return Math.floor(Math.random() * max) + min
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const defaultComments = [];

    // Loop through all the products
    for (let i = 0; i < num_fake_products; i++) {
      // Each product gets a random number of comments between max and min
      const num_comments = randomInt(100, 20)

      // For each comment...
      for (let j = 0; j < num_comments; j++) {
        // ... generate a random user id between 1 and the max number of users
        const userId = randomInt(num_fake_users, 1)


        // comment: faker.lorem.paragraph({ sentence_count: 1, supplemental: true, random_sentences_to_add: 4 }),

        defaultComments.push({
          comment: faker.lorem.paragraph(1, true, 4),
          userId,
          productId: i + 1
        })
      }
    }

    return queryInterface.bulkInsert('Comments', defaultComments, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
