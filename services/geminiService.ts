import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const chat: Chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: '你是「電腦開荒網」的 AI 助理。你的創作者是徐安德。你的專長是所有與電腦相關的主題，包含硬體、軟體、程式設計、網路和問題排除。請提供清晰、準確且易於理解的答案。',
    },
});

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "錯誤：API 金鑰未設定。請開發者檢查環境變數。";
  }
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    if (error instanceof Error) {
        return `錯誤：無法從 AI 得到回應。詳細資訊：${error.message}`;
    }
    return "錯誤：與 AI 通訊時發生未知錯誤。";
  }
};