const express = require("express");
const UserController = require("../cotrollers/userControllers");
const auth = require("../middleware/authentication");
const router = express.Router();


router.get("/", auth,UserController.userById)
router.post("/register", UserController.register);
router.post("/login", UserController.login)

module.exports = router;
