const express = require("express");
const {
  createStudent,
  getAllStudents,
  login,
  getStudentDetails,
  logOut,
} = require("../controllers/student");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/students/me").get(isAuthenticated, getStudentDetails);
module.exports = router;
