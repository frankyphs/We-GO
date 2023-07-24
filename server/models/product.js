'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Photography);
      Product.belongsTo(models.Venue);
      Product.belongsTo(models.Cathering);

    }
  }
  Product.init({
    title: DataTypes.STRING,
    PhotographyId: DataTypes.INTEGER,
    CatheringId: DataTypes.INTEGER,
    VenueId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};