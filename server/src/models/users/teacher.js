const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const teacherSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    // validate(value) {
    //     if (!validator.isEmail(value)) {
    //         throw new Error('Invalid Email');
    //     }
    // }
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    // validate(value) {
    //     if (!value.match(/\d/) || !value.match(/[a-zA-z]/)) {
    //         throw new Error('Password must contain atleast one letter and one number');
    //     }
    // },
    private: true,
  },
  role: {
    type: String,
    value: "teacher",
    default: "teacher",
  },
  qualification: {
    type: String,
    required: true,
  },
  
});

teacherSchema.pre("save", async function (next) {
  const teacher = this;
  if (teacher.isModified("password")) {
    teacher.password = await bcrypt.hash(teacher.password, 8);
  }
  next();
});

const teacher = mongoose.model("teacher", teacherSchema);

module.exports = teacher;
