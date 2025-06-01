import React from 'react'

const Footer = () => (
  <footer className="w-full bg-white/90 backdrop-blur-lg shadow-2xl border-t border-neutral-200 pt-12 pb-6 px-4 md:px-8 mt-16">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-0">
      {/* Brand & Description */}
      <div className="flex flex-col items-start space-y-2">
        <span className="text-2xl font-extrabold text-black tracking-tight">SupportBot</span>
        <span className="text-neutral-500 text-base max-w-xs">
          Your 24/7 AI-powered customer support assistant. Fast, friendly, and always available.
        </span>
        <div className="flex space-x-4 mt-2">
          <a href="#" className="text-neutral-400 hover:text-black transition" aria-label="Twitter">
            <i className="fab fa-twitter fa-lg"></i>
          </a>
          <a href="#" className="text-neutral-400 hover:text-black transition" aria-label="LinkedIn">
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
          <a href="#" className="text-neutral-400 hover:text-black transition" aria-label="GitHub">
            <i className="fab fa-github fa-lg"></i>
          </a>
        </div>
      </div>
      {/* Links */}
      <div className="flex flex-col sm:flex-row gap-8">
        <div>
          <h4 className="text-neutral-800 font-semibold mb-2">Company</h4>
          <ul className="space-y-1">
            <li><a href="#" className="text-neutral-600 hover:text-black transition">About Us</a></li>
            <li><a href="#" className="text-neutral-600 hover:text-black transition">Careers</a></li>
            <li><a href="#" className="text-neutral-600 hover:text-black transition">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-neutral-800 font-semibold mb-2">Support</h4>
          <ul className="space-y-1">
            <li><a href="#" className="text-neutral-600 hover:text-black transition">Help Center</a></li>
            <li><a href="#" className="text-neutral-600 hover:text-black transition">Contact Us</a></li>
            <li><a href="#" className="text-neutral-600 hover:text-black transition">FAQs</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-neutral-800 font-semibold mb-2">Legal</h4>
          <ul className="space-y-1">
            <li><a href="#" className="text-neutral-600 hover:text-black transition">Privacy Policy</a></li>
            <li><a href="#" className="text-neutral-600 hover:text-black transition">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      {/* Newsletter */}
      <div className="w-full md:w-80 mt-4 md:mt-0">
        <h4 className="text-neutral-800 font-semibold mb-2">Subscribe to our newsletter</h4>
        <form className="flex flex-col sm:flex-row w-full gap-2 sm:gap-0">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 px-3 py-2 rounded-xl sm:rounded-l-xl sm:rounded-r-none border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black bg-neutral-50 text-black"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-xl sm:rounded-l-none sm:rounded-r-xl font-semibold hover:bg-neutral-800 transition w-full sm:w-auto"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
    <div className="max-w-6xl mx-auto mt-8 border-t border-neutral-200 pt-4 flex flex-col md:flex-row items-center justify-between text-neutral-400 text-xs">
      <span>© {new Date().getFullYear()} SupportBot. All rights reserved.</span>
      <span>Made with <span className="text-black">♥</span> by Ankit.</span>
    </div>
  </footer>
)

export default Footer