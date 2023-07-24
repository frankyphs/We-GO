const { Cart, Photography, Venue, Cathering, Product } = require("../models");

class CartControllers {
  static async createCart(req, res, next) {
    try {
      const { id } = req.additionalData;

      const {
        title,
        bride,
        groom,
        weddingDate,
        PhotographyId,
        CatheringId,
        VenueId,
        totalPrice,
        contactNumber,
        address,
        pax,
      } = req.body;

      console.log(
        title,
        PhotographyId,
        CatheringId,
        VenueId,
        totalPrice,
        pax,
        groom,
        bride,
        weddingDate
      );

      if (
        !title ||
        !PhotographyId ||
        !CatheringId ||
        !VenueId ||
        !totalPrice ||
        !pax ||
        !groom ||
        !bride ||
        !weddingDate
      ) {
        throw { name: "cartError" };
      }
      const create = await Cart.create({
        UserId: id,
        title,
        bride,
        groom,
        weddingDate,
        PhotographyId,
        CatheringId,
        VenueId,
        totalPrice,
        contactNumber,
        address,
        pax,
      });

      const currentDate = new Date();
      const oneMonthAhead = new Date();
      oneMonthAhead.setMonth(currentDate.getMonth() + 1);

      if (new Date(weddingDate) < oneMonthAhead) {
        throw { name: "Date error" };
      }
      if (create) {
        res.status(201).json({
          message: `cart with id:${create.id} and userId:${create.UserId} was successfully created`,
        });
      }
    } catch (err) {
      next(err);
    }
  }
  static async createCartById(req, res, next) {
    try {
      const { idProduct } = req.params;
      const { id } = req.additionalData;
      const {
        totalPrice,
        pax,
        groom,
        bride,
        weddingDate,
        contactNumber,
        address,
      } = req.body;

      const data = await Product.findOne({
        where: {
          id: +idProduct,
        },
      });
      if (!data) {
        throw {
          name: "Product Not Found",
        };
      }

      // console.log(data, "hahahahahahahah");
      const create = await Cart.create({
        title: data.title,
        UserId: id,
        PhotographyId: +data.PhotographyId,
        CatheringId: +data.CatheringId,
        VenueId: +data.VenueId,
        pax,
        totalPrice,
        groom,
        bride,
        weddingDate,
        contactNumber,
        address,
      });

      const currentDate = new Date();
      const oneMonthAhead = new Date();
      oneMonthAhead.setMonth(currentDate.getMonth() + 1);

      if (new Date(weddingDate) < oneMonthAhead) {
        throw { name: "Date error" };
      }

      if (create) {
        res.status(201).json({
          message: `cart with id:${create.id} and userId:${create.UserId} was successfully created`,
        });
      }
    } catch (err) {
      console.log(err, "<<<<<<<<<<<<<");
      next(err);
    }
  }

  static async getData(req, res, next) {
    try {
      const { id } = req.additionalData;
      const data = await Cart.findAll({
        include: [
          { model: Photography },
          { model: Cathering },
          { model: Venue },
        ],
        where: {
          UserId: id,
          status: "unpaid",
        },
      });

      if (data) {
        res.status(200).json(data);
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateStatusById(req, res, next) {
    try {
      const { cartid } = req.params;
      const { id } = req.additionalData;

      const data = await Cart.findAll({
        where: {
          id: cartid,
          UserId: id,
        },
      });

      if (data.length == 0) {
        throw {
          name: "Cart Not Found",
        };
      }

      const dataUpdate = await Cart.update(
        {
          status: "paid",
        },
        {
          where: {
            id: cartid,
            UserId: id,
          },
        }
      );

      res.status(200).json({
        message: `Cart with id${cartid} has been successfully update`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteById(req, res, next) {
    try {
      const { cartid } = req.params;
      const { id } = req.additionalData;
      const data = await Cart.findAll({
        where: {
          id: cartid,
          UserId: id,
        },
      });

      if (data.length == 0) {
        throw {
          name: "Cart Not Found",
        };
      }

      await Cart.destroy({
        where: {
          id: cartid,
          UserId: id,
        },
      });

      res.status(201).json({
        message: `Cart id ${id}has been successfully deleted`,
      });
    } catch (err) {
      console.log(err, "<<<<<<<<<<<<<<<");
      next(err);
    }
  }
}

module.exports = CartControllers;
