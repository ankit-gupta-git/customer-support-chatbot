import React from "react";
import ChatbotPage from "./components/ChatbotPage";
import useLenisScroll from "./hooks/useLenisScroll";

const App = () => {
  useLenisScroll(); // Using the existing Lenis scroll hook

  return (
    <div>
      <ChatbotPage />
    </div>
  );
};

export default App;

