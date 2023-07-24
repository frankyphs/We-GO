const {comparePassword} = require("../helpers/bcrypt");
const {signToken} = require("../helpers/jwt");
const {User} = require("../models");
class UserController {
  static async register(req, res, next) {
    try {
      const {username, email, password, phoneNumber, imageUrl} = req.body;
      const data = await User.create({
        username,
        email,
        password,
        phoneNumber,
        imageUrl,
      });
      res.status(201).json({
        message: "Registered",
        email: data.email,
      });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const {email, password} = req.body;
      if (!email || !password) throw {name: "loginError"};
      const user = await User.findOne({where: {email: email}});
      if (!user) throw {name: "loginError"};
      if (!comparePassword(password, user.password)) throw {name: "loginError"};
      const access_token = signToken({
        id: user.id,
        email: user.email,
        role: user.role,
        username: user.username,
      });



      res.status(201).json({
        access_token,
        message: "Login Succes",
        email: user.email,
        role: user.role,
        username: user.username,
      });
    } catch (err) {
      next(err);
    }
  }
  static async userById(req, res, next) {
    try {
      const {id} = req.additionalData;

      const data = await User.findOne({
        where: {
          id,
        },
        attributes: {
          excludes: ["createdAt", "updatedAt"],
        },
      });
      if (!data) {
        throw {
          name: "User Not Found",
        };
      }

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = UserController;
