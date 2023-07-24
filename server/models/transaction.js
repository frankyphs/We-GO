"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User);
      Transaction.belongsTo(models.Cart);
    }
  }
  Transaction.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      noTransaction: DataTypes.STRING,
      status: DataTypes.STRING,
      CartId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  Transaction.beforeCreate((trans) => {
    trans.status = "pending";
  });
  return Transaction;
};
