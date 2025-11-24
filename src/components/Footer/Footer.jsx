import React from "react";
import logo from "../../assets/design-eye-catching-financial-logo.jpg";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-cyan-600 to-blue-600 text-base-content py-6 px-4 md:px-6 ">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-20">

          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <img
                src={logo}
                alt="FinEase Logo"
                className="w-12 h-12 object-contain rounded-xl shadow-md"
              />
              <NavLink
                to="/"
                className="text-3xl font-bold text-white flex items-center"
              >
                Fin<span className="text-yellow-300">Ease</span>
              </NavLink>
            </div>
            <p className="text-sm opacity-80">
              Power Up Your Savings, One Tap at a Time.
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-4">

            <a href="#" className="p-2 rounded-full hover:bg-white/20 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                className="fill-current text-white" viewBox="0 0 448 512">
                <path d="M357.2 48L427.8 48 273.6 224.2 455 464 313 464 201.7 318.6 74.5 464 3.8 464 168.7 275.5-5.2 48 140.4 48 240.9 180.9 357.2 48zM332.4 421.8l39.1 0-252.4-333.8-42 0 255.3 333.8z" />
              </svg>
            </a>

            <a href="#" className="p-2 rounded-full hover:bg-white/20 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                className="fill-current text-white" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>

            <a href="#" className="p-2 rounded-full hover:bg-white/20 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                className="fill-current text-white" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
              </svg>
            </a>

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-center md:text-left">

          <div className="px-2">
            <h3 className="font-bold text-lg text-white mb-2">Company</h3>
            <p className="text-sm opacity-80">
              FinEase is your trusted financial partner.  
              Manage expenses, budgets & goals effortlessly.
            </p>
          </div>

          <div className="px-4">
            <h3 className="font-bold text-lg text-white mb-2">Terms & Conditions</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><span className="text-green-600 text-xl">✔</span> Provide accurate and current information.</li>
              <li><span className="text-green-600 text-xl">✔</span> Keep your login credentials confidential.</li>
              <li><span className="text-green-600 text-xl">✔</span> Must be at least 16 years old.</li>
            </ul>
          </div>

          <div className="px-2">
            <h3 className="font-bold text-lg text-white mb-2">Contact</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>📍 28/1 Banani, Dhaka-Bangladesh</li>
              <li>📧 support@finease.com</li>
              <li>📞 +880 123 456 7890</li>
            </ul>
          </div>

        </div>

        <div className="divider my-4 opacity-30"></div>

        <p className="text-center text-sm opacity-75">
          © {new Date().getFullYear()} All Rights Reserved | Crafted with 💙 by FinEase Ltd
        </p>

      </div>
    </footer>
  );
};

export default Footer;
