"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Transaction);
      User.hasMany(models.Cart);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: {
          msg: "Username must be unique"
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email must be unique"
        },
        validate: {
          isEmail: {
            msg: "Invalid email format"
          },
          notNull: {
            msg: "Email is required"
          },
          notEmpty: {
            msg: "Email is required"
          }
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len:{
            args:[5],
            msg:"Minimum 5 characters required in password"
          },
          notEmpty: {
            msg: `password cant be Empty`
          },
          notNull: {
            msg: `password cant be Empty`
          }
        }
      },
      phoneNumber: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    user.dataValues.password = hashPassword(user.dataValues.password);
    user.dataValues.role = "Customer"
    user.dataValues.imageUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  });
  return User;
};
