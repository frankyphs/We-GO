'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photography extends Model {

    static associate(models) {
      Photography.hasMany(models.Cart);
      Photography.hasMany(models.Product);
    }
  }
  Photography.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    photo: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Photography',
  });
  return Photography;
};