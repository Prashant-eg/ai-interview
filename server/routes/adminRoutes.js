
// import express from "express";
// import Question from "../models/Question.js";
// import authMiddleware from "../middleware/authMiddleware.js";
// import adminMiddleware from "../middleware/adminMiddleware.js";

// const router = express.Router();

// router.use(authMiddleware, adminMiddleware);


// // GET: Saare questions dekhna
// router.get("/questions", async (req, res) => {
//   try {
//     const questions = await Question.find().sort({ createdAt: -1 });
//     res.status(200).json({
//       success: true,
//       count: questions.length,
//       questions,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Questions fetch nahi ho paaye.",
//     });
//   }
// });

// // POST: Naya question add karna
// router.post("/questions", async (req, res) => {
//   try {
//     const {
//       question,
//       category,
//       difficulty,
//       options,
//       correctAnswer,
//       explanation,
//     } = req.body;

//     if (
//       !question?.trim() ||
//       !category ||
//       !Array.isArray(options) ||
//       options.length !== 4 ||
//       options.some((option) => typeof option !== "string" || !option.trim()) ||
//       !correctAnswer ||
//       !options.includes(correctAnswer)
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Question, valid category, 4 options aur unmein se correct answer zaroori hain.",
//       });
//     }

//     const newQuestion = await Question.create({
//       question: question.trim(),
//       category,
//       difficulty,
//       options: options.map((option) => option.trim()),
//       correctAnswer,
//       explanation,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Question successfully add ho gaya.",
//       question: newQuestion,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message || "Question add nahi ho paaya.",
//     });
//   }
// });

// // PUT: Question update karna
// router.put("/questions/:id", async (req, res) => {
//   try {
//     const updatedQuestion = await Question.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!updatedQuestion) {
//       return res.status(404).json({
//         success: false,
//         message: "Question nahi mila.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Question update ho gaya.",
//       question: updatedQuestion,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message || "Question update nahi ho paaya.",
//     });
//   }
// });

// // DELETE: Question delete karna
// router.delete("/questions/:id", async (req, res) => {
//   try {
//     const deletedQuestion = await Question.findByIdAndDelete(
//       req.params.id
//     );

//     if (!deletedQuestion) {
//       return res.status(404).json({
//         success: false,
//         message: "Question nahi mila.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Question delete ho gaya.",
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: "Valid question ID provide karein.",
//     });
//   }
// });

// export default router;




















import { Router } from "express";
import Question from "../models/Question.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// Admin authorization check.
// Your User model must contain a role field such as "admin".
async function requireAdmin(req, res, next) {
  try {
    const User = (await import("../models/User.js")).default;
    const user = await User.findById(req.userId).select("role");

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required."
      });
    }

    next();
  } catch (error) {
    next(error);
  }
}

// GET /api/admin/questions
router.get("/", authMiddleware, requireAdmin, async (req, res, next) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json({ questions });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/questions
router.post("/", authMiddleware, requireAdmin, async (req, res, next) => {
  try {
    const {
      question,
      category,
      difficulty,
      options,
      correctAnswer,
      explanation = ""
    } = req.body;

    const allowedCategories = [
      "Technical",
      "HR",
      "Behavioral",
      "Aptitude"
    ];

    const allowedDifficulties = ["Easy", "Medium", "Hard"];

    if (!question?.trim()) {
      return res.status(400).json({ message: "Question is required." });
    }

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category." });
    }

    if (!allowedDifficulties.includes(difficulty)) {
      return res.status(400).json({ message: "Invalid difficulty." });
    }

    if (
      !Array.isArray(options) ||
      options.length !== 4 ||
      options.some(option => typeof option !== "string" || !option.trim())
    ) {
      return res.status(400).json({
        message: "Please provide all 4 options."
      });
    }

    if (!options.includes(correctAnswer)) {
      return res.status(400).json({
        message: "Correct answer must match one of the options."
      });
    }

    const newQuestion = await Question.create({
      question: question.trim(),
      category,
      difficulty,
      options: options.map(option => option.trim()),
      correctAnswer,
      explanation: explanation.trim()
    });

    res.status(201).json({
      message: "Question added successfully.",
      question: newQuestion
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/questions/:id
router.delete(
  "/:id",
  authMiddleware,
  requireAdmin,
  async (req, res, next) => {
    try {
      const deletedQuestion = await Question.findByIdAndDelete(req.params.id);

      if (!deletedQuestion) {
        return res.status(404).json({
          message: "Question not found."
        });
      }

      res.json({ message: "Question deleted successfully." });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
