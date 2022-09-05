const teacher = require("../models/users/teacher");
const student = require("../models/users/student");
const quiz = require("../models/quiz/quiz");
const course = require("../models/course/course");
const result = require("../models/quiz/result");
const fs = require("fs");
const { parse } = require("csv-parse");

//create

const addCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, creditHrs } = req.body;
    const exTeacher = await teacher.findById({ _id: id });
    if (!exTeacher) {
      return res
        .status(404)
        .send({ message: "No teachers found", success: false });
    }
    const newCourse = new course({
      name: name,
      creditHrs: creditHrs,
      teacher: id,
    });
    newCourse.save();
    res.status(200).send({ message: "course created", success: true });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

const addStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const exTeacher = await teacher.findById({ _id: id });
    if (!exTeacher) {
      return res
        .status(404)
        .send({ message: "No teachers found", success: false });
    }
    const { name, email, password, role } = req.body;
    const exStudent = await student.findOne({ email: email });
    if (exStudent) {
      return res
        .status(400)
        .send({ message: "student already present", success: false });
    }
    const newStudent = new student({
      name: name,
      email: email,
      password: password,
      role: role,
      createdBy: exTeacher._id,
    });
    newStudent.save();

    res.status(200).send({ message: "student created", success: true });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

const enrollStudents = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentIds } = req.body;
    const exCourse = await course.findById({ _id: id });
    if (!exCourse) {
      return res
        .status(404)
        .send({ message: "No course found", success: false });
    }
    for (let i = 0; i < studentIds.length; i++) {
      exCourse.students.push(studentIds[i]);
      const exStudent = await student.findById({ _id: studentIds[i] });
      exStudent.course.push(exCourse._id);
      exStudent.save();
    }
    exCourse.save();
    res.status(200).send({ success: true, message: "students enrolled" });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

const addQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const exCourse = await course.findById({ _id: id });
    if (!exCourse) {
      return res
        .status(404)
        .send({ message: "No course found", success: false });
    }
    const { quizData, maxScore, timeLimit } = req.body;
    const newQuiz = new quiz({
      quiz: quizData,
      maxScore: maxScore,
      timeLimit: timeLimit,
      course: id,
    });
    newQuiz.save();
    res.status(200).send({ message: "quiz created", success: true });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

const addQuizCsv = async (req, res) => {
  try {
    const { id } = req.params;
    const { maxScore, timeLimit } = req.body;
    if (!req.files) {
      return res.status(404).send({ message: "No files uploaded" });
    }
    const exCourse = await course.findById({ _id: id });
    if (!exCourse) {
      return res
        .status(404)
        .send({ message: "No coursefound", success: false });
    }
    let data = req.files.quizData;
    await data.mv("./tmp.csv");

    let csvData = [];
    fs.createReadStream("./tmp.csv")
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        let queObj = {
          question: row[0],
          options: row[1].split(","),
          score: row[2],
          isMultiSelect: row[3],
          answers: row[4].split(","),
          type: row[5],
        };
        csvData.push(queObj);
      })
      .on("end", function () {
        const newQuiz = new quiz({
          quiz: csvData,
          timeLimit: timeLimit,
          maxScore: maxScore,
          course: exCourse._id,
        });
        newQuiz.save();
        fs.unlinkSync("./tmp.csv");
      })
      .on("error", function (error) {
        return res.status(500).send({
          error: `Error reading CSV file: ${error.message}`,
          success: false,
        });
      });
    res.status(200).send({ message: "Quiz created", success: true });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

const getCourseQuizes = async (req, res) => {
  try {
    const { id } = req.params;
    const exCourse = await course.findById({ _id: id });
    if (!exCourse) {
      return res
        .status(404)
        .send({ message: "No course found", success: false });
    }
    const myQuizes = await quiz
      .find({ course: exCourse._id })
      .populate("course", "name");
    if (!myQuizes) {
      return res
        .status(404)
        .send({ message: "No quizes found", success: false });
    }
    res.status(200).send({ success: true, quizes: myQuizes });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await student
      .find({})
      .select("-password -role -course -createdBy");
    if (!students) {
      return res
        .status(404)
        .send({ message: "No students found", success: false });
    }
    res.status(200).send({ success: true, students: students });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

const getMyCourses = async (req, res) => {
  try {
    const { id } = req.params;
    const exTeacher = await teacher.findById({ _id: id });
    if (!exTeacher) {
      return res
        .status(404)
        .send({ message: "No teachers found", success: false });
    }
    const myCourses = await course.find({ teacher: exTeacher._id });
    if (!myCourses) {
      return res
        .status(404)
        .send({ message: "No teachers found", success: false });
    }
    res.status(200).send({ success: true, courses: myCourses });
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
      const exResults = await result.find({ quiz: exQuiz._id });
      if (!exResults) {
        return res
          .status(404)
          .send({ message: "No results found", success: false });
      }
      return res.status(200).send({ success: true, results: exResults });
    }
    if (exStudent) {
      const exResults = await result.find({ student: exStudent._id });
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
  addCourse,
  addStudent,
  addQuiz,
  addQuizCsv,
  enrollStudents,
  getCourseQuizes,
  getStudents,
  getMyCourses,
  getResults,
};
