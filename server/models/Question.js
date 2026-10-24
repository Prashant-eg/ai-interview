
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Technical", "HR", "Behavioral", "Aptitude"],
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    options: {
      type: [String],
      validate: {
        validator: (options) =>
          options.length === 4 &&
          options.every((option) => option.trim().length > 0),
        message: "Exactly 4 non-empty options are required",
      },
      required: true,
    },

    correctAnswer: {
      type: String,
      required: [true, "Correct answer is required"],
    },

    explanation: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

questionSchema.index({ category: 1, difficulty: 1 });

const Question = mongoose.model("Question", questionSchema);

export default Question;




