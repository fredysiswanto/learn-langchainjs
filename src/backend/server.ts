import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { chain } from "./chain.js";

dotenv.config();

const app = express();
// Port: dapat di-override via environment variable PORT
const PORT = process.env.PORT || 3010;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Chat endpoint
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { question } = req.body;

    if (!question) {
      res.status(400).json({ error: "Question is required" });
      return;
    }

    console.log("📝 Question:", question);

    const response = await chain.invoke({ question });

    console.log("✅ Response:", response);

    res.json({
      success: true,
      question,
      answer: response,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Serve frontend HTML (optional - untuk development)
app.use(express.static("dist/frontend"));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/chat`);
});
