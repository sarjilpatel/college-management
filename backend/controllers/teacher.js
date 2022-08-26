const Teacher = require("../models/teacher");

exports.createTeacher = async (req, res) => {
  try {
    const newTeacherData = {
      name: req.body.name,
    };

    const newTeacher = await Teacher.create(newTeacherData);

    res.status(201).json({
      success: true,
      teacher: newTeacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
