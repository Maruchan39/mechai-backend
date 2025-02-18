import express, { Express } from "express";
import { requireEnv } from "./utils/env";
import cors from 'cors';
import chatbotRoutes from './routes/chatbot.routes';


const app: Express = express();
app.use(cors());
app.use(express.json());

app.use("/api", chatbotRoutes);

const PORT = requireEnv('PORT');
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});