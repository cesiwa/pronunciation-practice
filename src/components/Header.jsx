import React from "react";

import profileImage from "../assets/profile.jpg";

function Header() {
  return (
    <header className="flex items-center justify-between bg-blue-600 p-4 shadow-md">
      {/* Sol tarafta uygulama simgesi */}
      <div className="flex items-center">
        <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
          {/* Logo */}
          <div className="flex items-center text-blue-600 font-bold text-lg">
            <span className="text-2xl">P</span>
            <span className="text-xl">A</span>
          </div>
        </div>
        <h1 className="ml-3 text-white text-xl font-bold">Pronunciation App</h1>
      </div>

      {/* Ortadaki linkler */}
      <nav className="hidden md:flex gap-6">
        <a href="/" className="text-white text-lg hover:underline">
          Home
        </a>
        <a href="#about" className="text-white text-lg hover:underline">
          About
        </a>
        <a href="#contact" className="text-white text-lg hover:underline">
          Contact
        </a>
      </nav>

      {/* Sağ tarafta profil fotoğrafı */}
      <div className="flex items-center">
        <img
          src={profileImage}
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-white shadow-md"
        />
      </div>
    </header>
  );
}

export default Header;
