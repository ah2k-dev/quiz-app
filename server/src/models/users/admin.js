const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const adminSchema = Schema({
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
    value: "admin",
    default: "admin",
    required: true,
  },
});
adminSchema.pre("save", async function (next) {
  const admin = this;
  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, 8);
  }
  next();
});

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;
