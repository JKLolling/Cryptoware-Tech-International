'use strict';
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        productName: DataTypes.STRING,
        description: DataTypes.TEXT,
        defaultImg: DataTypes.STRING,
        dayMade: DataTypes.STRING
    }, {});
    Product.associate = function(models) {
        const columnMapping = {
            through: 'ProductMakers',
            other: 'userId',
            foreignKey: 'productId'
        }
        Product.belongsToMany(models.User, columnMapping)

        Product.hasMany(models.Comment, { foreignKey: 'productId' })

        Product.hasMany(models.ProductPhoto, { foreignKey: 'productId' })
    };
    return Product;
};