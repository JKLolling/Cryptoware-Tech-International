'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('ProductPhotos', [
      { productId: 1, productImg: "https://cdn.pocket-lint.com/r/s/970x/assets/images/149963-tv-review-roku-premiere-review-image1-wfnuscxolu.jpg" }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    Example:
    return queryInterface.bulkDelete('ProductPhotos', null, {});

  }
};
