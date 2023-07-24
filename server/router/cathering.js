const express = require("express");
const CatheringController = require("../cotrollers/catheringController");
const router = express.Router();

router.get("/", CatheringController.getAllCathering);
router.get("/:id", CatheringController.getCatheringById);
module.exports = router;

