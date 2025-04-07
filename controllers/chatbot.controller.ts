import { Request, Response } from "express";
import { textGeneration } from "@huggingface/inference";
import { requireEnv } from "../utils/env";

const accessToken = requireEnv("HF_ACCESS_TOKEN");

type ChatbotMessage = {
  text: string;
  author: "chatbot";
};

type UserMessage = {
  text: string;
  author: "user";
};

export const getChatbotResponse = async (
  req: Request<{}, {}, UserMessage>,
  res: Response
) => {
  try {
    const { text } = req.body;

    const llamaResponse = await textGeneration({
      accessToken: accessToken,
      model: "meta-llama/Llama-3.2-3B-Instruct",
      inputs: text,
      parameters: {
        max_length: 100,
      },
    });

    const responseLines = llamaResponse["generated_text"].split("\n");
    const answerLines = responseLines
      .slice(1)
      .filter((line) => line.trim() !== "")
      .join("\n");

    const chatbotResponse: ChatbotMessage = {
      text: answerLines,
      author: "chatbot",
    };

    res.status(200).json(chatbotResponse);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};
