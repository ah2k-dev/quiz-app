const admin = require("../models/users/admin");
const teacher = require("../models/users/teacher");
const student = require("../models/users/student");
const quiz = require("../models/quiz/quiz");
const course = require("../models/course/course");
const result = require("../models/quiz/result");

//create
const addTeacher = async (req, res) => {
  try {
    const { name, email, password, role, qualification } = req.body;
    const exTeacher = await teacher.findOne({ email: email });
    if (exTeacher) {
      return res
        .status(400)
        .send({ message: "teacher already present", success: false });
    }
    const newTeacher = new teacher({
      name: name,
      email: email,
      password: password,
      role: role,
      qualification: qualification,
    });
    newTeacher.save();
    res.status(200).send({ message: "teacher created", success: true });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

//get

const getTeachers = async (req, res) => {
  try {
    const teachers = await teacher.find({});
    if (teachers.length < 0) {
      return res
        .status(404)
        .send({ message: "No teachers found", success: false });
    }
    res.status(200).send({ teachers: teachers, success: true });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await student
      .find({})
      .populate("course", "name creditHrs");
    if (students.length < 0) {
      return res
        .status(404)
        .send({ message: "No students found", success: false });
    }
    res.status(200).send({ students: students, success: true });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

const getQuizes = async (req, res) => {
  try {
    const quizes = await quiz.find({}).populate("course", "name creditHrs");
    if (quizes.length < 0) {
      return res
        .status(404)
        .send({ message: "No quizess found", success: false });
    }
    res.status(200).send({ quizes: quizes, success: true });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await course.find({}).populate("teacher", "name email");
    if (!courses) {
      return res
        .status(404)
        .send({ message: "No courses found", success: false });
    }
    res.status(200).send({ success: true, courses: courses });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

const getResults = async (req, res) => {
  try {
    const { id } = req.params;
    const exStudent = await student.findById({ _id: id });
    const exQuiz = await quiz.findById({ _id: id });
    if (exQuiz) {
      const exResults = await result
        .find({ quiz: exQuiz._id })
        .populate("student", "name email")
        .populate({
          path: "quiz",
          select: "maxScore",
          populate: {
            path: "course",
            select: "name",
          },
        });
      if (!exResults) {
        return res
          .status(404)
          .send({ message: "No results found", success: false });
      }
      return res.status(200).send({ success: true, results: exResults });
    }
    if (exStudent) {
      const exResults = await result
        .find({ student: exStudent._id })
        .populate("student", "name email")
        .populate({
          path: "quiz",
          select: "maxScore",
          populate: {
            path: "course",
            select: "name",
          },
        });
      if (!exResults) {
        return res
          .status(404)
          .send({ message: "No results found", success: false });
      }
      return res.status(200).send({ success: true, results: exResults });
    }
    res.status(404).send({ message: "No Data found", success: false });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

module.exports = {
  addTeacher,
  getTeachers,
  getStudents,
  getQuizes,
  getCourses,
  getResults,
};
