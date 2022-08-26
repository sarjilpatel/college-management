const Student = require("../models/student.js");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

exports.getAllStudents = async (req, res) => {
  console.log("hello");
  try {
    const students = await Student.find();
    res.status(200).json({
      success: true,
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getStudentDetails = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.body._id);
    const student = await Student.findById("62c42e3775695ca004892dfc");
    console.log(req.body._id);
    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
