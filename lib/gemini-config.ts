import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
console.log(apiKey)
const genAI = new GoogleGenerativeAI(apiKey!);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 0.7, // Lower temperature for more deterministic responses
  topP: 0.9,        // Slightly lower for more focused generation
  topK: 50,
  maxOutputTokens: 512, // Reduce to test stability in response
  responseMimeType: "application/json",
};


export const AiChatSession = model.startChat({
  generationConfig,
  history: [],
});
