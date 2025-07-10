import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-3xl font-bold bg-cyan-700  bg-clip-text text-transparent">
            VoxNova
          </h2>
          <p className="mt-4 text-sm text-gray-400">
            VoxNova is your trusted source for real, relevant, and reliable news. Stay connected with the stories that shape your world.
          </p>
        </div>

        {/* Quick Info (No NavLink) */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Information</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>🌍 Worldwide News Coverage</li>
            <li>📰 Premium & Exclusive Articles</li>
            <li>🕒 Updated Every Hour</li>
            <li>📬 support@voxnova.com</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 mt-2 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition"><FaTwitter /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition"><FaYoutube /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} VoxNova. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
