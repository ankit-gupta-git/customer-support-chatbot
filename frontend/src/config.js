const config = {
  API_URL: process.env.NODE_ENV === 'production' 
    ? 'https://customer-support-chatbot-1.onrender.com/api/chatbot'
    : 'http://localhost:5000/api/chatbot'
};

export default config; 