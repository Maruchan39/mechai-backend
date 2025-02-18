import { Request, Response } from "express";
import { HfInference } from "@huggingface/inference";
import { requireEnv } from "../utils/env";

const accessToken = requireEnv('HF_ACCESS_TOKEN');

const hf = new HfInference(accessToken);

const oilChangeContext = `
Changing the oil in your car is an essential part of vehicle maintenance that helps ensure the engine runs smoothly and efficiently. Here’s a step-by-step guide to changing your car’s oil:  

1. Gather Supplies: You will need new oil (check your owner’s manual for the correct type and amount), a new oil filter, a wrench, an oil filter wrench, a drain pan, a funnel, and gloves.  

2. Prepare the Car: Park your car on a flat surface and engage the parking brake. If necessary, lift the car using a jack and secure it with jack stands. Allow the engine to cool if it has been running.  

3. Drain the Old Oil: Locate the oil drain plug underneath the car. Place the drain pan beneath the plug, then use a wrench to remove the plug and let the old oil drain completely.  

4. Replace the Oil Filter: Use an oil filter wrench to remove the old oil filter. Before installing the new filter, apply a small amount of new oil to the gasket of the new filter to ensure a proper seal. Screw the new filter into place by hand, tightening it securely.  

5. Refill with New Oil: Once the old oil has drained and the new filter is installed, replace the drain plug and tighten it. Use a funnel to pour the new oil into the engine through the oil filler cap. Check the oil level using the dipstick to ensure you’ve added the correct amount.  

6. Dispose of Old Oil: Properly dispose of the old oil and filter at a recycling center or auto parts store.  

Regular oil changes help extend the life of your engine and improve fuel efficiency. Most manufacturers recommend changing the oil every 3,000 to 7,500 miles, depending on the vehicle and driving conditions.  
`;

export const getChatbotResponse = async (req: Request, res: Response) => {
  try {
    const  { question } = req.body;

    console.log(question);
    

    const robertaResponse = await hf.questionAnswering({
      model: "deepset/roberta-base-squad2",
      inputs: {
        question,
        context: oilChangeContext,
      },
    });

    res.status(200).json({ response: robertaResponse });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
};