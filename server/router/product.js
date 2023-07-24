const express = require("express");
const ProductController = require("../cotrollers/productController");
const router = express.Router();

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);

module.exports = router;


