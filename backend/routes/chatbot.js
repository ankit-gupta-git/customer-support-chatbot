const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const fetch = require("node-fetch");
require("dotenv").config();

router.post("/chat", async (req, res) => {
    const { message, language = "en" } = req.body;
    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        // Prefix message with language instruction
        const prompt = language === "en"
            ? message
            : `Please respond to the following message in ${language}: ${message}`;

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
                        maxOutputTokens: 256,
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