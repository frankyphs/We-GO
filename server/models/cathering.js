'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cathering extends Model {
  
    static associate(models) {
      Cathering.hasMany(models.Cart);
      Cathering.hasMany(models.Product);
    }
  }
  Cathering.init({
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cathering',
  });
  return Cathering;
};