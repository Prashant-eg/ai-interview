
// import express from "express";
// import User from "../models/User.js";
// import InterviewResult from "../models/InterviewResult.js";
// import authMiddleware from "../middleware/authMiddleware.js";
// import adminMiddleware from "../middleware/adminMiddleware.js";

// const router = express.Router();

// // Every analytics endpoint requires a valid login AND admin role.
// router.use(authMiddleware, adminMiddleware);

// router.get("/", async (req, res) => {
//   try {
//     const [
//       totalUsers,
//       loginStats,
//       totalInterviews,
//       scoreStats,
//       categoryStats,
//       users,
//       results,
//     ] = await Promise.all([
//       User.countDocuments({ role: "user" }),

//       User.aggregate([
//         { $group: { _id: null, total: { $sum: "$loginCount" } } },
//       ]),

//       InterviewResult.countDocuments(),

//       InterviewResult.aggregate([
//         {
//           $group: {
//             _id: null,
//             averageScore: { $avg: "$score" },
//           },
//         },
//       ]),

//       InterviewResult.aggregate([
//         {
//           $group: {
//             _id: "$category",
//             interviews: { $sum: 1 },
//             averageScore: { $avg: "$score" },
//           },
//         },
//         { $sort: { _id: 1 } },
//       ]),

//       User.find({ role: "user" })
//         .select("name email loginCount lastLoginAt createdAt")
//         .sort({ createdAt: -1 })
//         .lean(),

//       InterviewResult.find()
//         .populate("user", "name email")
//         .sort({ createdAt: -1 })
//         .lean(),
//     ]);

//     const userReports = users.map((user) => {
//       const userResults = results.filter(
//         (result) =>
//           result.user &&
//           result.user._id.toString() === user._id.toString()
//       );

//       const averageScore = userResults.length
//         ? Math.round(
//             userResults.reduce(
//               (sum, result) => sum + (Number(result.score) || 0),
//               0
//             ) / userResults.length
//           )
//         : 0;

//       return {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         loginCount: user.loginCount || 0,
//         lastLoginAt: user.lastLoginAt,
//         totalInterviews: userResults.length,
//         averageScore,
//         interviews: userResults.map((result) => ({
//           id: result._id,
//           category: result.category,
//           score: result.score,
//           correctAnswers: result.correctAnswers,
//           totalQuestions: result.totalQuestions,
//           createdAt: result.createdAt,
//         })),
//       };
//     });

//     const allLogins = loginStats[0]?.total || 0;
//     const averageScore = Math.round(
//       scoreStats[0]?.averageScore || 0
//     );

//     return res.json({
//       totals: {
//         totalUsers,
//         totalSuccessfulLogins: allLogins,
//         totalCompletedInterviews: totalInterviews,
//         averageScore,
//       },
//       categoryPerformance: categoryStats.map((item) => ({
//         category: item._id,
//         totalInterviews: item.interviews,
//         averageScore: Math.round(item.averageScore || 0),
//       })),
//       users: userReports,
//     });
//   } catch (error) {
//     console.error("Admin analytics error:", error);

//     return res.status(500).json({
//       message: "Failed to load admin analytics.",
//     });
//   }
// });

// export default router;


















import { Router } from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import InterviewResult from "../models/InterviewResult.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

async function requireAdmin(req, res, next) {
  try {
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

// GET /api/admin/analytics
router.get("/", authMiddleware, requireAdmin, async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalCompletedInterviews =
      await InterviewResult.countDocuments();

    const overallScore = await InterviewResult.aggregate([
      {
        $group: {
          _id: null,
          averageScore: { $avg: "$score" }
        }
      }
    ]);

    const categoryPerformance = await InterviewResult.aggregate([
      {
        $group: {
          _id: "$category",
          averageScore: { $avg: "$score" },
          totalInterviews: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          averageScore: { $round: ["$averageScore", 1] },
          totalInterviews: 1
        }
      },
      { $sort: { category: 1 } }
    ]);

    const users = await User.find()
      .select("name email role loginCount lastLoginAt")
      .lean();

    const userAnalytics = await Promise.all(
      users.map(async user => {
        const stats = await InterviewResult.aggregate([
          {
            $match: {
              user: new mongoose.Types.ObjectId(user._id)
            }
          },
          {
            $group: {
              _id: null,
              totalInterviews: { $sum: 1 },
              averageScore: { $avg: "$score" }
            }
          }
        ]);

        return {
          id: String(user._id),
          name: user.name || "Unknown",
          email: user.email || "",
          loginCount: user.loginCount ?? 0,
          totalInterviews: stats[0]?.totalInterviews ?? 0,
          averageScore: Math.round(stats[0]?.averageScore ?? 0),
          lastLoginAt: user.lastLoginAt || null
        };
      })
    );

    res.json({
      totals: {
        totalUsers,
        // This requires loginCount to be updated on successful login.
        totalSuccessfulLogins: users.reduce(
          (sum, user) => sum + (user.loginCount ?? 0),
          0
        ),
        totalCompletedInterviews,
        averageScore: Math.round(
          overallScore[0]?.averageScore ?? 0
        )
      },
      categoryPerformance,
      users: userAnalytics
    });
  } catch (error) {
    next(error);
  }
});

export default router;




