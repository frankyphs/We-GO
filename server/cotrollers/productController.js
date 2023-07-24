const { Product, Cathering, Photography, Venue } = require("../models");
class ProductController {
  static async getAllProducts(req, res, next) {
    try {
      const data = await Product.findAll({
        include: [
          { model: Photography },
          { model: Cathering },
          { model: Venue },
        ],
        order: [["id", "ASC"]],
      });

      if (data) {
        res.status(200).json(data);
      }

    } catch (err) {
      next(err);
    }
  }
  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Product.findOne({
        include: [
          { model: Photography },
          { model: Cathering },
          { model: Venue },
        ],
        where: { id },
      });
      if(!data){
        throw{
          name: "Product Not Found"
        }
      }
      res.status(200).json(data);
      
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;
