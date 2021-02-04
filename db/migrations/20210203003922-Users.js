'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Users', 'biography', {
                type: Sequelize.TEXT,
                allowNull: true
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([queryInterface.removeColumn('Users', 'biography')])
    }
};