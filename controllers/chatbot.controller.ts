import { Request, Response } from "express";
import { InferenceClient } from "@huggingface/inference";
import { requireEnv } from "../utils/env";

const accessToken = requireEnv("HF_ACCESS_TOKEN");

const client = new InferenceClient(accessToken);

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

    const chatCompletion = await client.chatCompletion({
      provider: "novita",
      model: "deepseek-ai/DeepSeek-V3-0324",
      messages: [
        {
          role: "user",
          content: text,
        },
      ],
    });

    const chatbotResponse: ChatbotMessage = {
      text:
        chatCompletion.choices[0].message.content ||
        "Sorry, I have encountered while fetching the answer",
      author: "chatbot",
    };

    console.log(chatCompletion.choices[0].message);

    res.status(200).json(chatbotResponse);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};
