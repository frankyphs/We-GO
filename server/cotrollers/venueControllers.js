const { Venue, VenueSchedule, sequelize } = require("../models/index");
const { Op, literal, fn, col } = require("sequelize");

class VenueControllers {
  static async getAll(req, res, next) {
    try {
      const { location, search, price, belowPrice, weddingDate } = req.query;

      console.log(req.query, "<<<<<<<<<<<<<<<<<<<<<,");

      let where = {};
      if (belowPrice) {
        where = {
          price: {
            [Op.lt]: belowPrice,
          },
        };
      }
      if (location) {
        where = {
          ...where,
          location: location,
        };
      }
      if (search) {
        where = {
          ...where,
          name: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }
      let filter = [["id", "ASC"]];
      if (price) {
        if (price === "lowest") {
          filter = [["price", "ASC"]];
        } else if (price === "higest") {
          filter = [["price", "DESC"]];
        }
      }

      // const data = await Venue.findAll({
      //   order: filter,
      //   where,
      // });

      let filterVenueSchedule = {};

      if (weddingDate) {
        where = {
          ...where,
          id: {
            [Op.notIn]: literal(
              `(SELECT "VenueId" FROM "VenueSchedules" WHERE TO_CHAR("weddingDate", 'yyyy-MM-dd') = '${weddingDate}')`
            ),
          },
        };
      }

      console.log(where, "<<<<<<<<<where controller>>>>>>>>>");

      const data = await Venue.findAll({
        order: filter,
        where,
        //   include: [{ model: VenueSchedule }],
      });

      if (data) {
        res.status(200).json(data);
      }
    } catch (err) {
      console.log(err, "<<< errror");
      next(err);
    }
  }

  static async getDetail(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Venue.findOne({ where: { id } });

      if (!data) {
        throw {
          name: "Venue Not Found",
        };
      }

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = VenueControllers;

// const data = await Venue.findAll({
//   order: filter,
//   where,
//   include: [
//     {
//       model: VenueSchedule,
//       where: {
//         weddingDate: {
//           [Op.eq]: new Date(weddingDate),
//         },
//       },
//       required: false,
//     },
//   ],
//   group: ["Venue.id"], // Include the primary key column of the Venue model
//   having: literal('COUNT("VenueSchedules"."id") = 0'),
// });

// console.log(data, "data>>>>>>>>>>>>>");
