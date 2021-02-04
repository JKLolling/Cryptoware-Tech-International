'use strict';

const faker = require('faker')

const { num_fake_users, num_fake_products } = require('../../config/index').db

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const maxTeamSize = 3;

    const randomInt = (max) => {
      return Math.floor(Math.random() * max) + 1
    }

    let joinData = []

    // Loop through all the fake products
    for (let i = 0; i < num_fake_products; i++) {
      // Each product has a random team size
      const teamSize = randomInt(maxTeamSize)
      const teamIdSet = new Set()

      for (let j = 0; j < teamSize; j++) {

        // Each team has only unique users
        const teamMemberId = randomInt(num_fake_users)
        if (teamIdSet.has(teamMemberId)) {
          j--;
          continue;
        }
        teamIdSet.add(teamMemberId)

        const productId = i + 1
        const userId = teamMemberId
        joinData.push({
          productId,
          userId
        })
      }
    }

    return queryInterface.bulkInsert('ProductMakers', joinData, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProductMakers', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
