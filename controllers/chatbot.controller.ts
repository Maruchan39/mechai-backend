import { Request, Response } from "express";
import { InferenceClient } from "@huggingface/inference";
import { requireEnv } from "../utils/env";

const accessToken = requireEnv("HF_ACCESS_TOKEN");

const client = new InferenceClient(accessToken);

type Message = {
  text: string;
  role: "user" | "chatbot";
};

export const getChatbotResponse = async (
  req: Request<{}, {}, Message[]>,
  res: Response
) => {
  try {
    const messages = req.body;

    const chatCompletion = await client.chatCompletion({
      provider: "novita",
      model: "deepseek-ai/DeepSeek-V3-0324",
      messages: messages,
    });

    const chatbotResponse = {
      content:
        chatCompletion.choices[0].message.content ||
        "Sorry, I have encountered while fetching the answer",
      role: "assistant",
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
