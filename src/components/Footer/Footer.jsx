import React from "react";
import logo from "../../assets/design-eye-catching-financial-logo.jpg";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-cyan-500 to-blue-500 text-base-content py-10 px-6 border-t border-base-300">
      <div className="max-w-7xl mx-auto">
        {/* Upper Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <img
                src={logo}
                alt="FinEase Logo"
                className="w-12 h-12 object-contain rounded-xl shadow-md"
              />
            <NavLink to="/" className="text-xl font-semibold flex items-center">
    Fin <span className="text-primary ml-1">Ease</span>
  </NavLink>

              
            </div>
            <p className="text-sm opacity-75">
              Power Up Your Savings, One Tap at a Time.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-col md:flex-row items-center gap-4 text-sm">
            <a className="link link-hover hover:text-primary transition-colors duration-200">
              Contact
            </a>
            <a className="link link-hover hover:text-primary transition-colors duration-200">
              Jobs
            </a>
            <a className="link link-hover hover:text-primary transition-colors duration-200">
              Press Kit
            </a>
          </nav>

          {/* Social Media Icons */}
          <div className="flex items-center justify-center gap-4">
            {/* Twitter */}
            <a
              href="#"
              className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 
                1.014-.611 1.794-1.574 2.163-2.723-.949.555-2.005.959-3.127 
                1.184-.897-.959-2.178-1.555-3.594-1.555-2.717 
                0-4.924 2.206-4.924 4.923 0 .39.045.765.127 
                1.124C7.691 8.095 4.066 6.13 1.64 
                3.161c-.427.722-.666 1.561-.666 2.475 
                0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.229-.616v.062c0 
                2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.317 
                0-.626-.03-.928-.086.627 1.956 2.444 3.377 4.6 
                3.419-1.68 1.316-3.809 2.101-6.102 
                2.101-.396 0-.788-.023-1.175-.067 
                2.189 1.394 4.768 2.209 7.557 2.209 
                9.054 0 14.004-7.496 14.004-13.986 
                0-.213-.005-.425-.014-.636.961-.689 
                1.8-1.56 2.46-2.548z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="#"
              className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              aria-label="YouTube"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 
                0-3.897.266-4.356 2.62-4.385 
                8.816.029 6.185.484 8.549 4.385 
                8.816 3.6.245 11.626.246 15.23 
                0 3.897-.266 4.356-2.62 
                4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 
                12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="#"
              className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8H6v4h3v12h5V12h3.642L18 
                8h-4V6.333C14 5.378 14.192 5 15.115 
                5H18V0h-3.808C10.596 0 9 1.583 9 
                4.615V8z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="divider my-8 opacity-40"></div>

        {/* Bottom Section */}
        <aside className="text-center text-sm opacity-70">
          <p>
            © {new Date().getFullYear()} FinEase — All Rights Reserved | Crafted
            with 💙 by ACME Industries Ltd
          </p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
