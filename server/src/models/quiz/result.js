const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = Schema({
  score: {
    type: String,
    required: true,
  },
  quiz: {
    type: Schema.Types.ObjectId,
    ref: "quiz",
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "student",
  },
  submission: {
    type: Schema.Types.Mixed,
    required: true,
  },
  lateSubmission: {
    type: String,
    required: true,
  },
  antiCheat: {
    type: [Schema.Types.ObjectId],
    ref: "antiCheat",
  },
});

const result = mongoose.model("result", resultSchema);

module.exports = result;
