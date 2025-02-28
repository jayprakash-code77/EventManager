const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminControllers");


router.get("/", adminControllers.newUser); // Handles /api/user/signup

module.exports = router;