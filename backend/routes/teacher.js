const express = require("express");
const { createTeacher } = require("../controllers/teacher");

const router = express.Router();

router.route("/teachers").post(createTeacher);

module.exports = router;
