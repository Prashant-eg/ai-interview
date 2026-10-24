
import express from "express";
import InterviewResult from "../models/InterviewResult.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Save interview result
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      category,
      totalQuestions,
      correctAnswers,
      answeredQuestions,
      durationSeconds,
    } = req.body;

    const allowedCategories = [
      "Technical",
      "HR",
      "Behavioral",
    ];

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        message: "Invalid interview category.",
      });
    }

    if (
      !Number.isInteger(totalQuestions) ||
      totalQuestions < 1 ||
      !Number.isInteger(correctAnswers) ||
      correctAnswers < 0 ||
      correctAnswers > totalQuestions
    ) {
      return res.status(400).json({
        message: "Invalid interview score data.",
      });
    }

    const score = Math.round(
      (correctAnswers / totalQuestions) * 100
    );

    const result = await InterviewResult.create({
      user: req.userId,
      category,
      totalQuestions,
      correctAnswers,
      score,
      answeredQuestions:
        Number.isInteger(answeredQuestions)
          ? answeredQuestions
          : 0,
      durationSeconds:
        Number.isInteger(durationSeconds)
          ? durationSeconds
          : 0,
    });

    res.status(201).json({
      message: "Interview result saved successfully.",
      result,
    });
  } catch (error) {
    console.error("Save interview result error:", error.message);

    res.status(500).json({
      message: "Failed to save interview result.",
    });
  }
});

// Get logged-in user's interview history
router.get("/my-results", authMiddleware, async (req, res) => {
  try {
    const results = await InterviewResult.find({
      user: req.userId,
    }).sort({ createdAt: -1 });

    const totalInterviews = results.length;

    const averageScore =
      totalInterviews > 0
        ? Math.round(
            results.reduce((sum, item) => sum + item.score, 0) /
              totalInterviews
          )
        : 0;

    res.json({
      totalInterviews,
      averageScore,
      results,
    });
  } catch (error) {
    console.error("Fetch interview results error:", error.message);

    res.status(500).json({
      message: "Failed to fetch interview results.",
    });
  }
});

export default router;




















