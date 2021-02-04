'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: {
                allowNull: false,
                type: Sequelize.STRING(50)
            },
            lastName: {
                allowNull: false,
                type: Sequelize.STRING(50)
            },
            picture: {
                type: Sequelize.STRING
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING(100),
                unique: true
            },
            hashedPassword: {
                allowNull: false,
                type: Sequelize.STRING.BINARY
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now')
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};