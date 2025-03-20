import { Request, Response } from "express";
import { HfInference } from "@huggingface/inference";
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

const hf = new HfInference(accessToken);

const oilChangeContext = `
Automobilio aliejaus keitimas yra esminė transporto priemonės priežiūros dalis, kuri padeda užtikrinti, kad variklis veiktų sklandžiai ir efektyviai. Štai žingsnis po žingsnio instrukcija, kaip pakeisti automobilio aliejų:

1. Paruoškite reikmenis: Jums reikės naujo aliejaus (patikrinkite savo automobilio vadove tinkamą tipą ir kiekį), naujo aliejaus filtro, veržliaraktės, aliejaus filtro veržliaraktės, nuotėkio indo, piltuvo ir pirštinių.

2. Paruoškite automobilį: Pastatykite automobilį ant lygaus paviršiaus ir įjunkite stovėjimo stabdį. Jei reikia, pakelkite automobilį naudodami domkratą ir pritvirtinkite jį stovais. Leiskite varikliui atvėsti, jei jis buvo įjungtas.

3. Nusausinkite seną aliejų: Raskite aliejaus nutekėjimo angą po automobiliu. Padėkite nuotėkio indą po angą, tada naudokite veržliaraktę, kad atsuktųte angą ir leiskite senam aliejui visiškai nutekėti.

4. Pakeiskite aliejaus filtrą: Naudokite aliejaus filtro veržliaraktę, kad išsuktumėte seną aliejaus filtrą. Prieš įstatydami naują filtrą, užtepkite nedidelį kiekį naujo aliejaus ant naujo filtro tarpiklio, kad užtikrintumėte tinkamą sandarumą. Įsukite naują filtrą rankomis, stipriai priverždami.

5. Pilkit naują aliejų: Kai senas aliejus nusausintas ir naujas filtras įstatytas, uždėkite nutekėjimo angą ir priveržkite ją. Naudokite piltuvą, kad įpiltumėte naują aliejų į variklį per aliejaus pildymo angą. Patikrinkite aliejaus lygį naudodami aliejaus meškerėlę, kad įsitikintumėte, jog įpylėte tinkamą kiekį.

6. Išmeskite seną aliejų: Tinkamai išmeskite seną aliejų ir filtrą perdirbimo centre arba automobilių detalių parduotuvėje.

Reguliarus aliejaus keitimas padeda pailginti variklio tarnavimo laiką ir pagerinti kuro sąnaudas. Dauguma gamintojų rekomenduoja keisti aliejų kas 3 000 iki 7 500 mylių, priklausomai nuo transporto priemonės ir vairavimo sąlygų.
`;

export const getChatbotResponse = async (
  req: Request<{}, {}, UserMessage>,
  res: Response
) => {
  try {
    const { text } = req.body;

    console.log(text);

    const robertaResponse = await hf.questionAnswering({
      model: "timpal0l/mdeberta-v3-base-squad2",
      inputs: {
        question: text,
        context: oilChangeContext,
      },
    });

    const chatbotResponse: ChatbotMessage = {
      text: robertaResponse.answer,
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
