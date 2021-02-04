'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Comments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            comment: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            productId: {
                allowNull: false,
                references: { model: "Products" },
                type: Sequelize.INTEGER
            },
            userId: {
                allowNull: false,
                references: { model: "Users" },
                type: Sequelize.INTEGER
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
        return queryInterface.dropTable('Comments');
    }
};