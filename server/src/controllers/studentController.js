const student = require("../models/users/student");
const quiz = require("../models/quiz/quiz");
const result = require("../models/quiz/result");
const antiCheat = require("../models/quiz/antiCheat");

const getCourses = async (req, res) => {
  try {
    const { id } = req.params;
    const exStudent = await student
      .findById({ _id: id })
      .populate("course", "name creditHrs teacher");
    if (!exStudent) {
      return res
        .status(404)
        .send({ message: "No students found", success: false });
    }
    const myCourses = exStudent.course;
    if (!myCourses) {
      return res
        .status(404)
        .send({ message: "Not enrolled in any course", success: false });
    }
    res.status(200).send({ success: true, courses: myCourses });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

const getQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const exQuiz = await quiz.findById({ _id: id }).select("-answer");
    if (!exQuiz) {
      return res.status(404).send({ message: "No quiz found", success: false });
    }
    let quizToSend = exQuiz;
    quizToSend.quiz.map((val) => {
      val.answers = [];
    });
    res.status(200).send({ success: true, quiz: quizToSend });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

const getResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { stdId } = req.body;
    const exQuiz = await quiz.findById({ _id: id });
    if (!exQuiz) {
      return res.status(404).send({ message: "No quiz found", success: false });
    }
    const exResult = await result
      .find({ quiz: id })
      .populate("student", "name");
    if (!exResult) {
      return res
        .status(404)
        .send({ message: "No result found", success: false });
    }
    let stdResult = exResult.filter((val) => val.student._id === stdId);
    res.status(200).send({ success: true, result: stdResult });
  } catch {
    res.status(500).send({ error: error, success: false });
  }
};

const getAllresults = async (req, res) => {
  try {
    const { id } = req.params;
    const exStudent = await student.findById({ _id: id });
    if (!exStudent) {
      return res
        .status(404)
        .send({ message: "No student found", success: false });
    }
    const exResults = await result
      .find({ student: id })
      .populate({
        path: "quiz",
        select: "maxScore",
        populate: {
          path: "course",
          select: "name",
        },
      })
      .populate({
        path: "antiCheat",
        select: "cheating",
      });
    if (!exResults) {
      return res
        .status(404)
        .send({ message: "No result found", success: false });
    }
    res.status(200).send({ success: true, results: exResults });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

const attemptQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { submission, stdId, late } = req.body;
    let score = 0;
    const exQuiz = await quiz.findById({ _id: id });
    const exStudent = await student.findById({ _id: stdId });
    if (!submission) {
      return res
        .status(404)
        .send({ message: "Submission is empty", success: false });
    }
    if (!exStudent) {
      return res
        .status(404)
        .send({ message: "No student found", success: false });
    }
    if (!exQuiz) {
      return res.status(404).send({ message: "No quiz found", success: false });
    }
    exQuiz.quiz.map((val) => {
      submission.map((val2) => {
        if (val.isMultiSelect === "no") {
          if (val2.question === val.question) {
            val2.answer.map((ans) => {
              if (val.answers.includes(ans)) {
                score = score + val.score;
              }
            });
          }
        }
        if (val.isMultiSelect === "yes") {
          if (val2.question === val.question) {
            val2.answer.map((ans) => {
              if (val.answers.includes(ans)) {
                score = score + val.score / val.answers.length;
              }
            });
          }
        }
      });
    });
    const cheating = await antiCheat.find({ quiz: id, student: stdId });

    const newResult = new result({
      student: stdId,
      quiz: id,
      score: score,
      submission: submission,
      lateSubmission: late,
      antiCheat: cheating?.length ? cheating[0]._id : [],
    });
    await newResult.save();
    exQuiz.attemptedStds.push(stdId);
    await exQuiz.save();
    res
      .status(200)
      .send({ success: true, message: "Quiz submitted successfully" });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

const cheatingDetection = async (req, res) => {
  try {
    const { id } = req.params;
    const { stdId } = req.body;
    const exQuiz = await quiz.findById({ _id: id });
    if (!exQuiz) {
      return res.status(404).send({ message: "No quiz found", success: false });
    }
    const exStudent = await student.findById({ _id: stdId });
    if (!exStudent) {
      return res
        .status(404)
        .send({ message: "No student found", success: false });
    }
    const newAntiCheat = new antiCheat({
      student: stdId,
      quiz: id,
      cheating: true,
    });
    await newAntiCheat.save();
    res.status(200).send({ success: true, message: "Cheating detected" });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

module.exports = {
  getCourses,
  getQuiz,
  getResult,
  getAllresults,
  attemptQuiz,
  cheatingDetection,
};
