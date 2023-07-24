const { Cathering } = require("../models");
const { Op } = require('sequelize');

class CatheringController {
  static async getAllCathering(req, res, next) {
    try {
      const { search, price, belowPrice } = req.query

      let where = {}
      if(belowPrice){
        where = {
          price: {
            [Op.lt]: belowPrice,
          }
        }
      }
      if (search) {
        where = {
          ...where,
          name: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }
      let filter = [["id", "ASC"]]
      if (price) {
        if (price === "lowest") {
          filter = [["price", "ASC"]]
        } else if (price === "higest") {
          filter = [["price", "DESC"]]
        }
      }
      const data = await Cathering.findAll({
        order: filter,
        where
      });

      if (data) {
        res.status(200).json(data);
      }

    } catch (err) {
      next(err);
    }
  }
  static async getCatheringById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Cathering.findOne({ where: { id } });

      if (!data) {
        throw {
          name: "Cathering Not Found"
        }
      }
      res.status(200).json(data);

    } catch (err) {
      next(err);
    }
  }
}

module.exports = CatheringController;
