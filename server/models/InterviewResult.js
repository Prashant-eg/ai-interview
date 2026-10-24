
import mongoose from "mongoose";

const interviewResultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    category: {
      type: String,
      enum: ["Technical", "HR", "Behavioral", "Aptitude"],
      required: true,
    },

    totalQuestions: {
      type: Number,
      required: true,
      min: 1,
      validate: Number.isInteger,
    },

    correctAnswers: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: function (value) {
          return (
            Number.isInteger(value) &&
            value <= this.totalQuestions
          );
        },
        message: "Correct answers cannot exceed total questions.",
      },
    },

    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    answeredQuestions: {
      type: Number,
      default: 0,
      min: 0,
    },

    durationSeconds: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const InterviewResult = mongoose.model(
  "InterviewResult",
  interviewResultSchema
);

export default InterviewResult;


















