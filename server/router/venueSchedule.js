const express = require("express");
const VenueSchedulesControllers = require("../cotrollers/venueScheduleController");
const router = express.Router();

router.get("/", VenueSchedulesControllers.getAllVenueSchedule);
router.post("/", VenueSchedulesControllers.postSchedule);
router.patch("/:id", VenueSchedulesControllers.patchStatus);

module.exports = router;
