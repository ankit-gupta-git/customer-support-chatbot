# 🤖 AI-Powered Customer Support Chatbot

A **highly intelligent and interactive AI chatbot** designed to provide **seamless customer support** using **Machine Learning (ML), Natural Language Processing (NLP), and the Gemini API**.

This chatbot enhances **customer experience**, provides **instant responses**, and offers **multi-modal support**, including **text and voice input/output**.

---

## 🚀 Key Features & Functionalities

### 🔍 1. Smart AI & NLP-Powered Conversations
✅ **Natural Language Processing (NLP)** – Understands human-like queries using the **Universal Sentence Encoder**.
✅ **AI-Based Intent Classification** – Detects user intent and provides **accurate responses**.
✅ **Gemini API Integration** – Uses **Google’s Gemini AI** for dynamic and intelligent responses.
✅ **Contextual Memory** – Maintains **conversation history** for a more natural chat experience.

---

### 🎙️ 2. Voice & Speech Interaction
✅ **Speech-to-Text (Voice Input)** – Users can talk to the chatbot via a **microphone**.
✅ **Text-to-Speech (Voice Output Only for Voice Input)** – The chatbot **only speaks responses when voice input is used**.
✅ **Multi-Language Support** – Detects and responds in **multiple languages**, allowing for **global accessibility**.

---

### 💬 3. Advanced Chat Experience & User Interaction
✅ **Rich Message Responses** – The chatbot can send **images, GIFs, and clickable links**.
✅ **Auto-Suggestions & Quick Replies** – AI suggests **related questions** to improve user engagement.
✅ **Real-Time Typing Indicator** – The chatbot shows an **animation** when processing a response.
✅ **Auto-Scroll to Latest Message** – The chat window **automatically scrolls** to new messages.
✅ **Dark Mode & Custom Themes** – Users can switch **themes** for a personalized experience.

---

### 📊 4. Data Storage & Analytics
✅ **User Authentication & Chat History** – Saves user queries in **MongoDB** for future reference.
✅ **Performance Dashboard** – Admins can track **chatbot usage, active users, and response times**.
✅ **Error Logging & Debugging** – Maintains **logs** for error handling and chatbot performance improvements.

---

## 🛠️ Tech Stack

🔹 **Frontend:** React.js (Next.js) + TailwindCSS + Framer Motion
🔹 **Backend:** Node.js + Express.js
🔹 **Database:** MongoDB
🔹 **Machine Learning & NLP:** Universal Sentence Encoder, Gemini API
🔹 **Hosting:** Vercel (Frontend) + Render/Heroku (Backend)

---

## 📥 Installation & Setup

### **Step 1: Clone the Repository**
```sh
git clone https://github.com/ankit-gupta-git/customer-support-chatbot
cd customer-support-chatbot

```
### **Step 2: Install Dependencies**
```sh
Backend Setup

cd backend
npm install

Frontend Setup

cd ../frontend
npm install

```
### **Step 3: Set Up API Keys & Database**
```sh
Get Gemini API Key
🔹 Go to Google AI Studio → Google AI Studio
🔹 Generate an API key from the Gemini API section.
🔹 Store the key in backend/.env:

GEMINI_API_KEY=your_api_key_here


Connect MongoDB Database
🔹 Create a MongoDB Atlas account → MongoDB Atlas
🔹 Get your MongoDB URI and store it in backend/.env:

MONGO_URI=your_mongodb_connection_string


```
### **🚀 Running the Project**
```sh
Run Backend (Port: 5000)

cd backend
npm start


Run Frontend (Port: 3000)

cd frontend
npm run dev

```
### **📡 API Endpoints**
```sh
Authentication
🔹 POST /api/auth/register – Register a new user
🔹 POST /api/auth/login – User login
🔹 GET /api/auth/user – Get logged-in user details

Chatbot Interaction
🔹 POST /api/chat/sendMessage – Send a message to the chatbot
🔹 GET /api/chat/history – Retrieve past chat history

Admin & Analytics
🔹 GET /api/admin/stats – View chatbot usage statistics
🔹 GET /api/admin/logs – Retrieve error logs and debugging data

```
### **💡 Future Enhancements**
```sh
🚀 AI Training on Custom Data – Improve chatbot accuracy by fine-tuning on company-specific datasets.
🚀 WhatsApp & Messenger Integration – Deploy chatbot on multiple platforms.
🚀 Live Agent Handoff – Seamlessly transfer users to a human agent when required.
🚀 E-Commerce Product Recommendation – AI-powered product suggestions based on user behavior.
🚀 Custom Chatbot Personalities – Users can customize chatbot tone & personality.

```
### **📞 Support & Contact**
For issues & feature requests, contact Ankit Gupta
📧 Email: [ankitkumargupta752@gmail.com](mailto:ankitkumargupta752@gmail.com)  
🐦 Twitter: [@ankitgupta_79](https://twitter.com/ankitgupta_79)

### **🎉 Thank You for Using AI Chatbot! 🚀**
