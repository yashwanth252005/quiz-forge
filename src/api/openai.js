import axios from 'axios';
import OpenAI from "openai";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const endpoint = import.meta.env.VITE_OPENAI_BASE_URL || "https://api.openai.com/v1";
const modelName = "gpt-4o";

export async function getQuizQuestions(topic, difficulty) {
  const prompt = `Generate 10 multiple-choice questions about ${topic} with 4 options each (A, B, C, D) and mark the correct answer. Difficulty: ${difficulty}. Return the result as a JSON array like:
[
  {
    "question": "...?",
    "options": { "A": "...", "B": "...", "C": "...", "D": "..." },
    "answer": "A/B/C/D"
  }
]`;
  
  const client = new OpenAI({ baseURL: endpoint, apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });

  const response = await client.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      top_p: 1.0,
      max_tokens: 1000,
      model: modelName,
  });
  
  // console.log(response.choices[0].message.content);
  let text = response.choices[0].message.content;


if (text.startsWith("```json")) {
  text = text.replace(/```json/, '').replace(/```/, '').trim();
}


  try {
    return JSON.parse(text);
  } catch (err) {
    console.error('Failed to parse JSON:', text);
    return [];
  }
}

