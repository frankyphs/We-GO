"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User);
      Cart.belongsTo(models.Photography);
      Cart.belongsTo(models.Venue);
      Cart.belongsTo(models.Cathering);
    }
  }
  Cart.init(
    {
      title: DataTypes.STRING,
      bride: DataTypes.STRING,
      groom: DataTypes.STRING,
      contactNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      weddingDate: DataTypes.DATE,
      UserId: DataTypes.INTEGER,
      PhotographyId: DataTypes.INTEGER,
      CatheringId: DataTypes.INTEGER,
      VenueId: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      pax: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  Cart.beforeBulkCreate((cart) => {
    cart.status = "pending";
  });
  return Cart;
};
