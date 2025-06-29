import { GoogleGenerativeAI } from "@google/generative-ai"; 
import config from "../../config";

if (!config.gemini_api_key) {
  throw new Error("Gemini API key is missing in config.");
}
const genAI = new GoogleGenerativeAI(config.gemini_api_key);

const CreateaskGemini = async (prompt: string): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
  const result = await model.generateContent(prompt); 
  const response = result.response;
  const text = response.text();

  return text;
};

const GetaskGemini = async (): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent("Say hello from Gemini AI!");
  const response = result.response;
  const text =  response.text();

  return text;
};
export const ChatbotService = {
  CreateaskGemini ,
  GetaskGemini
};
