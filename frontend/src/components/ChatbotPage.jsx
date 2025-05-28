import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import ReactMarkdown from "react-markdown";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([{ text: "Hi there, ask me anything:", sender: "bot" }]);
  const [userInput, setUserInput] = useState("");
  const [isVoiceInput, setIsVoiceInput] = useState(false);
  const [language, setLanguage] = useState("en"); // Default language
  const messageEndRef = useRef(null);

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

    try {
      const response = await fetch("http://localhost:5000/api/chatbot/chat", {
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
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f6ff] to-[#d1d5ff]">
      <div className="w-1/2 h-full flex items-center justify-center">
        <Spline scene="https://prod.spline.design/jZKiGRzbDWGHT6ZS/scene.splinecode" />
      </div>

      <div className="w-1/2 flex flex-col items-start text-left space-y-6 px-16">
        <h1 className="text-5xl font-bold text-gray-900">
          Need Help? <span className='text-[#159ccb]'>Ask Our AI Chatbot</span> Anytime!
        </h1>
        <p className="text-gray-600">Get instant support in your own language—just select it and ask!</p>

        {/* Language Selector */}
        <motion.select
  whileFocus={{ scale: 1.03 }}
  whileHover={{ scale: 1.02 }}
  value={language}
  onChange={(e) => setLanguage(e.target.value)}
  className="bg-white text-gray-800 font-semibold px-4 py-2 rounded-xl border border-transparent shadow-md hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
>
  <option value="en">🇺🇸 English</option>
  <option value="es">🇪🇸 Spanish</option>
  <option value="fr">🇫🇷 French</option>
  <option value="de">🇩🇪 German</option>
  <option value="hi">🇮🇳 Hindi</option>
</motion.select>


        <motion.div
          className="w-[400px] bg-white/90 shadow-lg rounded-2xl p-6 border border-gray-300 backdrop-blur-lg"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>

          <div className="text-left space-y-3 max-h-64 overflow-auto">
            {messages.map((msg, index) => (
              <p key={index} className={`p-2 rounded-lg ${msg.sender === "bot" ? "bg-gray-200 text-gray-700" : "bg-blue-200 text-blue-700"}`}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </p>
            ))}
            <div ref={messageEndRef} />
          </div>

          <div className="flex items-center mt-4 border-t pt-3 space-x-3">
            <input
              type="text"
              placeholder="Ask a question..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent outline-none p-2 text-gray-700"
            />

            <button onClick={() => handleSendMessage()} className="text-gray-600 hover:text-black">➜</button>

            <button
              onClick={startListening}
              className="bg-gray-800 text-white w-16 h-12 flex items-center justify-center rounded-full hover:bg-gray-600 transition"
            >
              <i className="fa-solid fa-microphone text-lg"></i>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatbotPage;
