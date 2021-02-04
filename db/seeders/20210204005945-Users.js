'use strict';
const faker = require('faker')
module.exports = {
    up: (queryInterface, Sequelize) => {
        const num_fake_products = 50
        const defaultUsers = [];

        for (let i = 0; i < num_fake_products; i++) {
            defaultUsers.push({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                picture: faker.image.people(),
                email: faker.internet.exampleEmail(),
                hashedPassword: faker.internet.password()
            })
        }

        return queryInterface.bulkInsert('Users', defaultUsers, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};