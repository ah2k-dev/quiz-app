const express = require("express");
const { getCourseQuizes } = require("../controllers/teacherController");
const {
  getCourses,
  getQuiz,
  getResult,
  getAllresults,
  attemptQuiz,
  cheatingDetection,
} = require("../controllers/studentController");
const { authenticateJWT } = require("../middleware/Token");
const router = express.Router();

router.route("/getCourses/:id").get(authenticateJWT, getCourses); // student id
router.route("/getCourseQuizes/:id").get(authenticateJWT, getCourseQuizes); //course id
router.route("/getQuiz/:id").get(authenticateJWT, getQuiz); //quiz id
router.route("/attemptQuiz/:id").post(authenticateJWT, attemptQuiz); // quiz id //student id req.body
router.route("/getResult/:id").post(authenticateJWT, getResult); //quiz id
router.route("/getAllresults/:id").get(authenticateJWT, getAllresults); //student id
router.route("/antiCheat/:id").post(authenticateJWT, cheatingDetection); //quiz id //student id req.body

module.exports = router;
