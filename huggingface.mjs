import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

const accessToken = process.env.HF_ACCESS_TOKEN;

const hf = new HfInference(accessToken);

(async () => {
  try {
    const robertaResponse = await hf.questionAnswering({
      model: 'deepset/roberta-base-squad2',
      inputs: {
        question: 'How often should I change oil?',
        context: 'The oil of car should be changed once per year or per 10 000km'
      }
    });
    console.log("Roberta Response:", robertaResponse);
  } catch (error) {
    console.error("Error:", error);
  }
})();
