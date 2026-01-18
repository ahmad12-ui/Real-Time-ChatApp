import React from "react";
import { FiHeart, FiCode } from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-900 py-3 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span>Made with</span>
          <FiHeart className="text-[#8B0000]" />
          <span>in 2025</span>
        </div>

        <div className="flex items-center gap-6 mt-3 sm:mt-0">
          <a
            href="#"
            className="hover:text-[#8B0000] transition-colors flex items-center gap-1.5"
          >
            <FiCode className="text-lg" />
            <span>Source Code</span>
          </a>
          <span>© {new Date().getFullYear()} ChatApp</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
