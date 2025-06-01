import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95vw] max-w-6xl rounded-2xl bg-white/60 shadow-xl backdrop-blur-lg flex items-center justify-between px-6 py-4 border border-neutral-200">
      {/* Brand */}
      <div className="flex items-center space-x-3">
        <span className="text-2xl font-extrabold text-black tracking-tight">SupportBot</span>
        <span className="text-sm text-neutral-500 font-semibold">Customer Support</span>
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <a href="#" className="text-neutral-700 hover:text-black font-medium transition">Home</a>
        <a href="#" className="text-neutral-700 hover:text-black font-medium transition">About</a>
        <a href="#" className="text-neutral-700 hover:text-black font-medium transition">Contact</a>
      </div>
      {/* Hamburger */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-neutral-300 bg-white/80 hover:bg-neutral-200 transition"
        onClick={() => setOpen(!open)}
        aria-label="Open Menu"
      >
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} />
        </svg>
      </button>
      {/* Mobile Dropdown */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white/95 shadow-xl rounded-b-2xl border-t border-neutral-200 flex flex-col items-center py-4 md:hidden animate-fade-in z-50">
          <a href="#" className="w-full text-center py-2 text-neutral-700 hover:text-black font-medium transition" onClick={() => setOpen(false)}>Home</a>
          <a href="#" className="w-full text-center py-2 text-neutral-700 hover:text-black font-medium transition" onClick={() => setOpen(false)}>About</a>
          <a href="#" className="w-full text-center py-2 text-neutral-700 hover:text-black font-medium transition" onClick={() => setOpen(false)}>Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;