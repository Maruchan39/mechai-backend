import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { getMockChatbotResponse } from './mocks/getMockChatbotResponse';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors());

app.post("/", (req: Request, res: Response) => {
  const response = getMockChatbotResponse();
  console.log(req.body);
  res.json(response);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
