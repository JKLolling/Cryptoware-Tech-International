'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.TEXT,
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Comment.associate = function (models) {
    Comment.belongsTo(models.Product, { foreignKey: 'productId' })
    Comment.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Comment;
};
