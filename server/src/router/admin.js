const express = require("express");
const { authenticateJWT } = require("../middleware/Token");
const {
  addTeacher,
  getTeachers,
  getTeacher,
  getStudents,
  getStudent,
  getQuizes,
  getCourses,
  getResults,
} = require("../controllers/adminController");
const { getCourseQuizes } = require("../controllers/teacherController");
const router = express.Router();

// create
router.route("/addTeacher").post(authenticateJWT, addTeacher);

//get
router.route("/getTeachers").get(authenticateJWT, getTeachers);
router.route("/getStudents").get(authenticateJWT, getStudents);
router.route("/getQuizes").get(authenticateJWT, getQuizes);
router.route("/getCourses").get(authenticateJWT, getCourses);
router.route("/getResults/:id").get(authenticateJWT, getResults); // student id //quiz id
router.route("/getCourseQuizes/:id").get(authenticateJWT, getCourseQuizes) // course id


module.exports = router;
