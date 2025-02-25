const express = require("express");
const router = express.Router();
const userContollers = require("../controllers/usersControllers")


router.get("/signup", userContollers.newUser);

module.exports = router;
