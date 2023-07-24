const express = require("express");
const PhotographyController = require("../cotrollers/photographyController");
const router = express.Router();

router.get("/", PhotographyController.getAllPhotographies);
router.get("/:id", PhotographyController.getPhotographyById);

module.exports = router;
