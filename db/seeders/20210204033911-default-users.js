'use strict';

const faker = require('faker')
const bcrypt = require('bcryptjs')

const { num_fake_users } = require('../../config/index').db

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const defaultUsers = [];

        for (let i = 0; i < num_fake_users; i++) {
            const hashedPassword = await bcrypt.hash('password', 10)
            defaultUsers.push({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                biography: faker.name.jobTitle() + ': ' + faker.company.catchPhrase() + ' to ' + faker.company.bs(),
                picture: faker.image.people(),
                hashedPassword
            })
        }

        return queryInterface.bulkInsert('Users', defaultUsers, {})
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, { truncate: true, restartIdentity: true, cascade: true });
    }
};