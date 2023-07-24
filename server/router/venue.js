const express = require("express");
const VenueControllers = require("../cotrollers/venueControllers");
const router = express.Router();

router.get("/", VenueControllers.getAll)
router.get("/:id", VenueControllers.getDetail)


module.exports = router;





