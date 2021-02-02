'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        picture: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false
        },
        hashedPassword: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});
    User.associate = function(models) {
        // associations can be defined here
    };
    return User;
};