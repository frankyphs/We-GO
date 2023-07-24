const { VenueSchedule } = require("../models/index");
const { Op } = require("sequelize");

class VenueScheduleControllers {
  static async getAllVenueSchedule(req, res, next) {
    try {
      const data = await VenueSchedule.findAll();

      if (data) {
        res.status(200).json(data);
      }
    } catch (error) {
      next(err);
    }
  }

  static async postSchedule(req, res, next) {
    try {
      const { VenueId, weddingDate } = req.body;

      const currentDate = new Date();
      const oneMonthAhead = new Date();
      oneMonthAhead.setMonth(currentDate.getMonth() + 1);

      if (new Date(weddingDate) < oneMonthAhead) {
        throw { name: "Date error" };
      }

      const create = await VenueSchedule.create({
        VenueId,
        weddingDate,
        status: false,
      });

      if (create) {
        res.status(201).json({
          message: `Venue Schedule for Venue Id ${VenueId} at date ${weddingDate} Has Been Created Successfuly`,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async patchStatus(req, res, next) {
    try {
      const { id } = req.params;

      const data = await VenueSchedule.findAll({
        where: { id: id },
      });

      if (data.length == 0) {
        throw {
          name: "Venue Scedule Not Found",
        };
      }

      await VenueSchedule.update(
        {
          status: true,
        },
        {
          where: {
            id: id,
          },
        }
      );

      res.status(201).json({
        message: `Venue Schedule with id ${id} has been successfully update`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = VenueScheduleControllers;
