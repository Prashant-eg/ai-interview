import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
router.post("/", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        message: "Please enter a message.",
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        message: "Message 2000 characters se chhota rakhein.",
      });
    }

    const safeHistory = Array.isArray(history)
      ? history
          .filter(
            (item) =>
              item &&
              ["user", "assistant"].includes(item.role) &&
              typeof item.content === "string"
          )
          .slice(-10)
          .map((item) => ({
            role: item.role,
            content: item.content.slice(0, 2000),
          }))
      : [];

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      instructions:
        "You are InterviewAI, a helpful interview preparation assistant. Help users with technical interviews, HR questions, behavioral interviews, resume guidance, and career preparation. Explain concepts in simple English or Hinglish according to the user's message. Give practical examples and structured answers. Never claim to guarantee a job.",
      input: [
        ...safeHistory,
        { role: "user", content: message.trim() },
      ],
    });

    return res.json({
      reply:
        response.output_text ||
        "Sorry, I could not generate a response. Please try again.",
    });
  } catch (error) {
    console.error("AI chat error:", error.message);

    return res.status(500).json({
      message:
        "AI assistant abhi response nahi de pa raha. API key, billing aur backend logs check karein.",
    });
  }
});

export default router;
