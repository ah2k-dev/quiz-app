const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const studentSchema = Schema({
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
    value: "student",
    required: true,
    default: "student",
  },
  course: [
    {
      type: Schema.Types.ObjectId,
      ref: "course",
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "teacher",
    required: true,
  },
});

studentSchema.pre("save", async function (next) {
  const student = this;
  if (student.isModified("password")) {
    student.password = await bcrypt.hash(student.password, 8);
  }
  next();
});

const student = mongoose.model("student", studentSchema);

module.exports = student;
