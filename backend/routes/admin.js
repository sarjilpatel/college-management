const express = require("express");
const {
  createStudent,
  getAllStudents,
  addTeacherToStudent,
  createAdmin,
  login,
  logout,
  createTeacher,
  createSubject,
  getAllTeachers,
  getAllSubjects,
  getOneStudent,
  getOneTeacher,
  getOneSubject,
} = require("../controllers/admin");
const { isAdminAuthenticated } = require("../middlewares/adminAuth");

const router = express.Router();

router.route("/admin/create/admin").post(isAdminAuthenticated, createAdmin);
router.route("/admin/create/student").post(isAdminAuthenticated, createStudent);
router.route("/admin/create/teacher").post(isAdminAuthenticated, createTeacher);
router.route("/admin/create/subject").post(isAdminAuthenticated, createSubject);

router.route("/admin/get/students").get(isAdminAuthenticated, getAllStudents);
router.route("/admin/get/teachers").get(isAdminAuthenticated, getAllTeachers);
router.route("/admin/get/subjects").get(isAdminAuthenticated, getAllSubjects);

router
  .route("/admin/get/students/:id")
  .get(isAdminAuthenticated, getOneStudent);
router
  .route("/admin/get/teachers/:id")
  .get(isAdminAuthenticated, getOneTeacher);
router
  .route("/admin/get/subjects/:id")
  .get(isAdminAuthenticated, getOneSubject);

router
  .route("/admin/add/stt/:student/:teacher")
  .get(isAdminAuthenticated, addTeacherToStudent); //subject to teacher
router
  .route("/admin/add/tts/:subject/:teacher")
  .get(isAdminAuthenticated, addTeacherToStudent); //teacher to subject
router
  .route("/admin/add/sts/:subject/:student")
  .get(isAdminAuthenticated, addTeacherToStudent); //student to subject

router.route("/admin/login").post(login);
router.route("/admin/logout").get(isAdminAuthenticated, logout);
module.exports = router;
