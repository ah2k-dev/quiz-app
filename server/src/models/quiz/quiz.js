const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = Schema({
  quiz: [
    {
      question: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
        enum: ["text", "image", "voice"],
      },
      options: {
        type: [String],
        required: true,
      },
      answers: {
        type: [String],
        required: true,
      },
      isMultiSelect: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
    },
  ],
  course: {
    type: Schema.Types.ObjectId,
    ref: "course",
  },
  maxScore: {
    type: Number,
    required: true,
  },
  timeLimit: {
    type: Number,
    required: true,
  },
  attemptedStds: {
    type: [Schema.Types.ObjectId],
    ref: "student",
  },
});

const quiz = mongoose.model("quiz", quizSchema);

module.exports = quiz;
