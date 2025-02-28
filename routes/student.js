const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/studentControllers");

// router.post("/", userControllers.newUser); // Handles /api/user/signup
router.get("/", userControllers.newUser);

module.exports = router;
