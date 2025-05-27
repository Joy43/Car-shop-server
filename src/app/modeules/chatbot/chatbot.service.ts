import config from "../../config";

const askGemini = async (prompt: string): Promise<string> => {
  const { GoogleGenAI } = await import("@google/genai");
  const ai = new GoogleGenAI({ apiKey: config.gemini_api_key });
  const result = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return result.candidates?.[0]?.content?.parts?.[0]?.text || "";
};

export const ChatbotService = {
  askGemini,
};
