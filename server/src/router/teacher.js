const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/Token");
const {
  addCourse,
  addStudent,
  addQuiz,
  enrollStudents,
  getStudents,
  getCourseQuizes,
  addQuizCsv,
  getMyCourses,
  getResults,
} = require("../controllers/teacherController");

//add
router.route("/addCourse/:id").post(authenticateJWT, addCourse); //teacher id
router.route("/addStudent/:id").post(authenticateJWT, addStudent); //teacher id
router.route("/addQuiz/:id").post(authenticateJWT, addQuiz); //course id
router.route("/addQuizCsv/:id").post(authenticateJWT, addQuizCsv); //course id
router.route("/enrollStudents/:id").post(authenticateJWT, enrollStudents); //course id

//get
router.route("/getMyCourses/:id").get(authenticateJWT, getMyCourses); //teacher id
router.route("/getStudents").get(authenticateJWT, getStudents);
router.route("/getCourseQuizes/:id").get(authenticateJWT, getCourseQuizes); //course id
router.route('/getResults/:id').get(authenticateJWT, getResults); //student id

module.exports = router;
