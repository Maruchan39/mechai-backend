// routes/chatbot.routes.ts
import express from "express";
import { getChatbotResponse } from "../controllers/chatbot.controller";

const router = express.Router();

router.post("/chatbot", getChatbotResponse);

export default router;