const admin = require("../models/users/admin");
const teacher = require("../models/users/teacher");
const student = require("../models/users/student");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config({
  path: "src/config/config.env",
});

const login = async (req, res) => {
  const { role, email, password } = req.body;
  if (role.toLowerCase() === "admin") {
    try {
      const exAdmin = await admin.findOne({ email: email });
      if (!exAdmin) {
        return res
          .status(404)
          .send({ success: false, message: "user not found" });
      }
      const validate = await bcrypt.compare(password, exAdmin.password);
      if (!validate) {
        return res
          .status(401)
          .send({ message: "Invalid password", success: false });
      }
      const token = jwt.sign(
        { id: exAdmin._id, role: exAdmin.role },
        process.env.TOKEN_SECRET
      ); 

      return res.status(200).send({
        token: token,
        user: exAdmin,
        role: "admin",
        message: "Logged in",
        success: true,
      });
    } catch (error) {
      res.status(500).send({ error: error, success: false });
    }
  }
  if (role.toLowerCase() === "teacher") {
    try {
      const exTeacher = await teacher.findOne({ email: email });
      if (!exTeacher) {
        return res
          .status(404)
          .send({ success: false, message: "user not found" });
      }
      const validate = await bcrypt.compare(password, exTeacher.password);
      if (!validate) {
        return res
          .status(401)
          .send({ message: "Invalid password", success: false });
      }
      const token = jwt.sign(
        { id: exTeacher, role: exTeacher.role },
        process.env.TOKEN_SECRET
      ); 
      return res.status(200).send({
        token: token,
        user: exTeacher,
        role: "teacher",
        message: "Logged in",
        success: true,
      });
    } catch (error) {
      res.status(500).send({ error: error, success: false });
    }
  }
  if (role.toLowerCase() === "student") {
    try {
      const exStudent = await student.findOne({ email: email });
      if (!exStudent) {
        return res
          .status(404)
          .send({ success: false, message: "user not found" });
      }
      const validate = await bcrypt.compare(password, exStudent.password);
      if (!validate) {
        return res
          .status(401)
          .send({ message: "Invalid password", success: false });
      }
      const token = jwt.sign(
        { id: exStudent, role: exStudent.role },
        process.env.TOKEN_SECRET
      );
      return res.status(200).send({
        token: token,
        user: exStudent,
        role: "student",
        message: "Logged in",
        success: true,
      });
    } catch (error) {
      res.status(500).send({ error: error, success: false });
    }
  }
  return res.status(404).send({ success: false, message: "user not found" });
};

const presistLogin = async (req, res) => {
  const { token } = req.body;
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  if (decodedToken.role === "admin") {
    try {
      const exAdmin = await admin.findById(decodedToken.id);
      return res.status(200).send({
        user: exAdmin,
        role: "admin",
        message: "Logged in",
        token: token,
        success: true,
      });
    } catch (error) {
      return res.status(500).send({ error: error, success: false });
    }
  }
  if (decodedToken.role === "teacher") {
    try {
      const exTeacher = await teacher.findById(decodedToken.id);
      return res.status(200).send({
        user: exTeacher,
        role: "teacher",
        message: "Logged in",
        token: token,
        success: true,
      });
    } catch (error) {
      return res.status(500).send({ error: error, success: false });
    }
  }
  if (decodedToken.role === "student") {
    try {
      const exStudent = await student.findById(decodedToken.id);
      return res.status(200).send({
        user: exStudent,
        role: "student",
        message: "Logged in",
        token: token,
        success: true,
      });
    } catch (error) {
      return res.status(500).send({ error: error, success: false });
    }
  }
  return res.status(404).send({ success: false, message: "user not found" });
};

const logout = async (req, res) => {
  try {
    req.user = null;
    return res.status(200).send({ message: "Logged out", success: true });
  } catch (error) {
    return res.status(500).send({ error: error, success: false });
  }
};

module.exports = {
  login,
  presistLogin,
  logout,
};
