import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Spline from '@splinetool/react-spline';
import ReactMarkdown from "react-markdown";
import Navbar from "./Navbar";
import Footer from "./Footer";
import config from "../config";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([{ text: "Hi there, ask me anything:", sender: "bot" }]);
  const [userInput, setUserInput] = useState("");
  const [isVoiceInput, setIsVoiceInput] = useState(false);
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);
  const inputRef = useRef(null);
  const isFirstRender = useRef(true);

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = language === "en" ? "en-US" : language;

  const startListening = () => {
    setIsVoiceInput(true);
    recognition.lang = language === "en" ? "en-US" : language;
    recognition.start();
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setUserInput(transcript);
    handleSendMessage(transcript);
  };

  const speakResponse = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (inputText = userInput) => {
    if (!inputText.trim()) return;

    const newMessage = [...messages, { text: inputText, sender: "user" }];
    setMessages(newMessage);
    setUserInput("");
    setLoading(true);
    try {
      const response = await fetch(`${config.API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputText, language }),
      });

      const data = await response.json();
      const cleanedResponse = data.botResponse.replace(/\*\*/g, "").replace(/\*/g, "");

      setMessages([...newMessage, { text: cleanedResponse, sender: "bot" }]);

      if (isVoiceInput) {
        speakResponse(cleanedResponse);
        setIsVoiceInput(false);
      }
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Do NOT scroll on first render
      return;
    }
    // Only scroll when a new message is added (not on mount)
    if (messages.length > 1) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="relative w-screen min-h-screen bg-neutral-100 flex flex-col overflow-x-hidden">
      <Navbar />
      {/* Decorative SVG or abstract background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Top Right Circle */}
        <svg className="absolute top-0 right-0 w-64 h-64 opacity-10" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="200" fill="#000" />
        </svg>
        {/* Center Faint Large Circle */}
        <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] opacity-5" viewBox="0 0 800 800" fill="none">
          <circle cx="300" cy="300" r="300" fill="#000" />
        </svg>
      </div>

      {/* Centered Heading and Description */}
      <div className="z-10 flex flex-col items-center justify-center mt-40 mb-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 text-center leading-tight tracking-tight mb-4">
          Need Help?
          <br />
          <span className="text-white bg-black px-5 py-1 rounded mt-2 inline-block">Ask our AI Chatbot</span>
        </h1>
        <p className="text-neutral-500 text-lg md:text-xl text-center max-w-2xl">
          Get instant, professional support in your language. Select below and ask away!
        </p>
      </div>

      {/* Main Content: Spline + Chatbot */}
      <div className="flex flex-1 flex-col md:flex-row items-center justify-center z-10 gap-8 md:gap-12 w-full px-2 md:px-0">
        {/* Spline Scene - always first on mobile */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-0 md:p-4 order-1">
          <div
            className="w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl bg-white flex items-center justify-center"
            style={{
              minHeight: "340px",
              height: "100%",
              maxHeight: "650px"
            }}
          >
            <Spline
              scene="https://prod.spline.design/cyyMqzEeXWZEihwN/scene.splinecode"
              style={{
                width: "100%",
                height: "340px",
                maxHeight: "650px",
                background: "#fff"
              }}
              className="md:!h-[650px] !h-[340px]"
              eventListeners="window"
            />
          </div>
        </div>
        {/* Chatbot Right */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-0 md:p-4 order-2">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-4 md:p-10 border border-neutral-200">
            {/* Language Selector */}
            <motion.select
              whileFocus={{ scale: 1.03 }}
              whileHover={{ scale: 1.02 }}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-neutral-100 text-neutral-900 font-semibold px-4 py-2 rounded-xl border border-neutral-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 mb-6 w-full md:w-auto"
            >
              <option value="en">🇺🇸 English</option>
              <option value="es">🇪🇸 Spanish</option>
              <option value="fr">🇫🇷 French</option>
              <option value="de">🇩🇪 German</option>
              <option value="hi">🇮🇳 Hindi</option>
            </motion.select>
            {/* Chat Box */}
            <motion.div
              className="w-full bg-neutral-50 shadow-inner rounded-2xl p-4 md:p-6 border border-neutral-200"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex space-x-2 mb-4">
                <div className="w-3 h-3 bg-black rounded-full"></div>
                <div className="w-3 h-3 bg-neutral-500 rounded-full"></div>
                <div className="w-3 h-3 bg-neutral-300 rounded-full"></div>
              </div>
              {/* Chat Messages */}
              <div className="text-left space-y-3 h-72 md:h-80 overflow-y-auto pr-2 custom-scrollbar">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-xl text-base ${
                      msg.sender === "bot"
                        ? "bg-neutral-200 text-neutral-900 border border-neutral-300"
                        : "bg-black text-white border border-neutral-700"
                    }`}
                  >
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                ))}
                <div ref={messageEndRef} />
              </div>
              {/* Typing Indicator */}
              {loading && (
                <p className="italic text-neutral-400 mt-2">Bot is typing...</p>
              )}
              {/* Input Area */}
              <div className="flex items-center mt-6 border-t border-neutral-200 pt-4 space-x-2 md:space-x-3">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message…"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-neutral-100 outline-none p-3 text-black text-base rounded-xl border border-neutral-300 focus:ring-2 focus:ring-black transition"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="bg-black text-white hover:bg-neutral-800 rounded-xl px-5 py-3 text-2xl transition flex items-center justify-center"
                  aria-label="Send"
                >➜</button>
                <button
                  onClick={startListening}
                  className="bg-neutral-900 text-white w-12 h-12 flex items-center justify-center rounded-full border border-neutral-300 hover:bg-black transition"
                  aria-label="Voice Input"
                >
                  <i className="fa-solid fa-microphone text-lg"></i>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatbotPage;
