const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const antiCheatSchema = Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "student",
  },
  quiz: {
    type: Schema.Types.ObjectId,
    ref: "quiz",
  },
  cheating: {
    type: Boolean,
    required: true,
  },
});

const antiCheat = mongoose.model("antiCheat", antiCheatSchema);

module.exports = antiCheat;
