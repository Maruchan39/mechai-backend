import { Router } from "express";
import { getChatbotResponse } from "../controllers/chatbot.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/chatbot", authenticate, getChatbotResponse);

export default router;
