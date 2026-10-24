
// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";

// import authRoutes from "./routes/authRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import analyticsRoutes from "./routes/analyticsRoutes.js";
// import interviewRoutes from "./routes/interviewRoutes.js";

// const app = express();

// app.use(cors({
//   origin: process.env.CLIENT_URL || "http://localhost:5173"
// }));
// app.use(express.json({ limit: "1mb" }));

// app.get("/api/health", (req, res) => {
//   res.json({ status: "ok", service: "InterviewAI API" });
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/admin/questions", adminRoutes);
// app.use("/api/admin/analytics", analyticsRoutes);
// app.use("/api/interviews", interviewRoutes);

// const PORT = process.env.PORT || 5000;

// async function startServer() {
//   try {
//     if (!process.env.MONGODB_URI) {
//       throw new Error("MONGODB_URI is missing in .env");
//     }
//     if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 24) {
//       throw new Error("JWT_SECRET must contain at least 24 characters");
//     }

//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("MongoDB connected successfully");

//     app.listen(PORT, () => {
//       console.log(`API running at http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error("Server startup failed:", error.message);
//     process.exit(1);
//   }
// }

// startServer();



























import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";


const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173"
}));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "InterviewAI API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/admin/questions", adminRoutes);
app.use("/api/admin/analytics", analyticsRoutes);
app.use("/api/interviews", interviewRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in .env");
    }
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 24) {
      throw new Error("JWT_SECRET must contain at least 24 characters");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`API running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
