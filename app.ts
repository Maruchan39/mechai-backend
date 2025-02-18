import express, { Express } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import chatbotRoutes from './routes/chatbot.routes';

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

app.use("/api", chatbotRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});