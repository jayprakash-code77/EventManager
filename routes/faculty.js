const express = require("express");
const router = express.Router();
const facultyControllers = require("../controllers/facultyControllers");


router.get("/", facultyControllers.newUser);

module.exports = router;