"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    static associate(models) {
      Venue.hasMany(models.Cart);
      Venue.hasMany(models.Product);

      Venue.hasMany(models.VenueSchedule, { foreignKey: "VenueId" }); // Add foreign key
    }
  }
  Venue.init(
    {
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      locationGoogle: DataTypes.ARRAY(DataTypes.STRING),
      price: DataTypes.INTEGER,
      capacity: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      isBooked: DataTypes.BOOLEAN,
      photo: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: "Venue",
    }
  );
  return Venue;
};
