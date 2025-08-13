import express, { Express } from "express";
import { requireEnv } from "./utils/env";
import cors from "cors";
import chatbotRoutes from "./routes/chatbot.routes";
import authRoutes from "./routes/auth.routes";
import { connectDatabase } from "./config/mongodb.config";

const app: Express = express();
app.use(cors());
app.use(express.json());

connectDatabase();

app.use("/api", chatbotRoutes);
app.use("/auth", authRoutes);

const PORT = requireEnv("PORT");
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
