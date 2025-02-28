const express = require("express");
const router = express.Router();

const studentRouter = require("./student"); // Require student.js
const facultyRouter = require("./faculty") //  Require faculty.js
const adminRouter = require("./admin") // Require admin.js

router.use("/student", studentRouter); // Mounts all /student routes under /api
router.use("/faculty", facultyRouter); // Mounts all /faculty routes under /api
router.use("/admin", adminRouter); // Mounts all /admin routes under /api



module.exports = router;
