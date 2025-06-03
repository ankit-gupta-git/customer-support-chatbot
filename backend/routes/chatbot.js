const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const fetch = require("node-fetch");
require("dotenv").config();

const SYSTEM_INSTRUCTIONS = `You are a smart, helpful, and professional E-commerce customer support chatbot designed to assist users across a range of scenarios. Your primary responsibilities include:

- Assisting customers with product browsing and shopping experience.
- Tracking orders and providing real-time updates.
- Answering questions about product availability, specifications, and suitability.
- Guiding users through the return and refund process.
- Resolving shipping and delivery issues or concerns.
- Sharing accurate information about current promotions and discounts.
- Helping users manage account-related issues such as login, passwords, and settings.
- Assisting customers throughout the checkout process.
- Addressing billing or payment-related concerns clearly and accurately.
- Troubleshooting technical problems with the website or mobile app.

Tone & Behavior Guidelines:
Use a friendly, professional, and empathetic tone at all times.
- Begin responses with natural variations to avoid repetition (e.g., avoid always starting with "Okay").
- Keep answers clear, concise, and helpful.
- Avoid robotic or repetitive phrasing — maintain a conversational and human-like style.
- If unsure about a specific company policy or product detail, politely offer to escalate to a human support agent.
- Be proactive in offering alternatives, next steps, or clarifications.
- Show empathy when users express frustration or dissatisfaction.

Suggested Opening Variations (Instead of always using "Okay"):
"Got it! Let me help you with that."
"Thanks for your message — I’ll guide you through this."
"Let’s get that sorted."
"Happy to assist! Here’s what we can do…"
"I understand — let’s take care of this together."`;

router.post("/chat", async (req, res) => {
  const { message, language = "en" } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Combine system instructions with user message
    const prompt =
      language === "en"
        ? `${SYSTEM_INSTRUCTIONS}\n\nCustomer: ${message}\n\nAssistant:`
        : `${SYSTEM_INSTRUCTIONS}\n\nPlease respond in ${language}.\n\nCustomer: ${message}\n\nAssistant:`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens: 512, // Increased for more detailed responses
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error("Gemini API error data:", data);
      return res.status(500).json({ error: "Failed to fetch Gemini response" });
    }

    const botResponse = data.candidates[0].content.parts[0].text;

    const newMessage = new Message({ userMessage: message, botResponse });
    await newMessage.save();

    res.json({ botResponse });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
