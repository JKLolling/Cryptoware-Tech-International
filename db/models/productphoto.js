'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductPhoto = sequelize.define('ProductPhoto', {
    productId: DataTypes.INTEGER,
    productImg: DataTypes.STRING,
  }, {});
  ProductPhoto.associate = function (models) {
    ProductPhoto.belongsTo(models.Product, { foreignKey: "productId" })
  };
  return ProductPhoto;
};
