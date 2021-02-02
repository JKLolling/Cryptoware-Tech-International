'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        picture: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
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