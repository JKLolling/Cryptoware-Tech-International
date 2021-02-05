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
            type: DataTypes.STRING.BINARY,
            allowNull: false
        },
        biography: {
            type: DataTypes.TEXT
        }
    }, {});
    User.associate = function(models) {
        const columnMapping = {
            through: 'ProductMakers',
            other: 'productId',
            foreignKey: 'userId'
        }
        User.belongsToMany(models.Product, columnMapping)

        User.hasMany(models.Comment, { foreignKey: 'userId' })
    };
    return User;
};