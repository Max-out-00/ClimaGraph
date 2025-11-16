import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    const result = await model.generateContent(userMessage);

    res.json({
      reply: result.response.text(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini API error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
