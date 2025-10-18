const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

function buildPrompt({ title, bullets, description }) {
  return `
You are an Amazon listing optimization specialist with extensive expertise in e-commerce SEO and content compliance. Please leverage your advanced skills to enhance the provided product information by executing the following tasks with precision and professionalism:

Given the following product information:
Title: ${title}
Bullet Points: ${bullets.join(" | ")}
Description: ${description}

Optimize the listing as follows:
Title Optimization: Craft an improved product title that is rich in relevant keywords yet maintains readability and aligns with Amazon’s character and style guidelines.
Bullet Points Refinement: Rewrite up to five bullet points to ensure clarity, conciseness, and a strong focus on customer benefits, avoiding redundancy and maintaining compliance with Amazon’s policies.
Description Enhancement: Develop a persuasive product description that effectively highlights key features and benefits while strictly adhering to Amazon’s content standards, avoiding any unsubstantiated claims or prohibited language.
SEO Keyword Suggestions: Identify and suggest 3 to 5 new, highly relevant keywords that can enhance search visibility and improve organic ranking within Amazon’s marketplace.

Return your response in strict JSON format:
{
  "optimized_title": "...",
  "optimized_bullets": ["...", "..."],
  "optimized_description": "...",
  "optimized_keywords": ["...", "..."]
}
  `;
}

async function optimizeListing({ title, bullets, description }) {
  const prompt = buildPrompt({ title, bullets, description });

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          { 
            role: "user",
            parts: [{ text: prompt }] 
          }
        ],
        generationConfig: { 
          responseMimeType: "application/json",
        },
      }
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    return JSON.parse(text.trim());

  } catch (err) {
    if (err.response && err.response.status === 429) {
      throw new Error("AI rate limit exceeded. Please try again later.");
    }
    if (err.response && err.response.data) {
        console.error("AI API Error Details:", err.response.data);
    }
    throw new Error("AI optimization failed: " + err.message);
  }
}

module.exports = { optimizeListing };