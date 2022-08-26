const Admin = require("../models/admin");
const Student = require("../models/student");
const Subject = require("../models/subject");
const Teacher = require("../models/teacher");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Admin does not exist",
      });
    }

    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = await admin.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      admin,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const newStudentData = {
      name: req.body.name,
      phone: req.body.phone,
      parentsName: req.body.parentsName,
      parentsPhone: req.body.parentsPhone,
      address: req.body.address,
      totalBacklogs: req.body.totalBacklogs,
      feesPaid: req.body.feesPaid,
      enrollmentNumber: req.body.enrollmentNumber,
      sem: req.body.sem,
      email: req.body.email,
      password: req.body.password,
    };

    const newStudent = await Student.create(newStudentData);

    res.status(201).json({
      success: true,
      student: newStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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

exports.createAdmin = async (req, res) => {
  try {
    const newAdminData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const newAdmin = await Admin.create(newAdminData);

    res.status(201).json({
      success: true,
      admin: newAdmin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createSubject = async (req, res) => {
  try {
    const newsubjectData = {
      name: req.body.name,
    };

    const newSubject = await Subject.create(newsubjectData);

    res.status(201).json({
      success: true,
      subject: newSubject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addTeacherToStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.student);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const teacher = await Teacher.findById(req.params.teacher);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    if (!student.teachers.includes(teacher._id)) {
      student.teachers.push(teacher._id);
      teacher.students.push(student._id);

      await student.save();
      await teacher.save();

      return res.status(200).json({
        success: true,
        message: "Teacher added",
      });
    }

    res.status(201).json({
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

exports.addSubjectToStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.student);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const subject = await Subject.findById(req.params.teacher);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    if (!student.subjects.includes(teacher._id)) {
      student.subjects.push(subject._id);
      subject.students.push(student._id);

      await student.save();
      await subject.save();

      return res.status(200).json({
        success: true,
        message: "Subject added",
      });
    }

    res.status(201).json({
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

exports.addSubjectToTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.student);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    const subject = await Subject.findById(req.params.teacher);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    if (!teacher.subjects.includes(teacher._id)) {
      teacher.subjects.push(subject._id);
      subject.teachers.push(teacher._id);

      await teacher.save();
      await subject.save();

      return res.status(200).json({
        success: true,
        message: "Subject added",
      });
    }

    res.status(201).json({
      success: true,
      teacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAllStudents = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const students = await Student.find(queryObj);

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

exports.getAllTeachers = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const teachers = await Teacher.find(queryObj);
    res.status(200).json({
      success: true,
      teachers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json({
      success: true,
      subjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOneStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
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

exports.getOneTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    res.status(200).json({
      success: true,
      teacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOneSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    res.status(200).json({
      success: true,
      subject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
