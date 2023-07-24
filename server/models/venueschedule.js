"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VenueSchedule extends Model {
    static associate(models) {
      VenueSchedule.belongsTo(models.Venue, { foreignKey: "VenueId" }); // Add foreign key
    }
  }
  VenueSchedule.init(
    {
      VenueId: DataTypes.INTEGER,
      weddingDate: {
        type: DataTypes.DATE,
      },
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "VenueSchedule",
    }
  );
  return VenueSchedule;
};
