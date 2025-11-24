import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router";
import logo from "../../assets/design-eye-catching-financial-logo.jpg";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const [openMobileAvatar, setOpenMobileAvatar] = useState(false);
  const [openDesktopAvatar, setOpenDesktopAvatar] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const mobileAvatarRef = useRef(null);
  const desktopAvatarRef = useRef(null);

  
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");

  
  useEffect(() => {
    const close = (e) => {
      if (mobileAvatarRef.current && !mobileAvatarRef.current.contains(e.target)) {
        setOpenMobileAvatar(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    const close = (e) => {
      if (desktopAvatarRef.current && !desktopAvatarRef.current.contains(e.target)) {
        setOpenDesktopAvatar(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleSignOut = () => {
    setOpenMobileAvatar(false);
    setOpenDesktopAvatar(false);

    setTimeout(() => {
      signOutUser()
        .then(() => (window.location.href = "/login"))
        .catch((err) => console.log(err));
    }, 70);
  };

  const handleProtectedClick = (path) => {
    user ? navigate(path) : navigate("/login");
  };

  const animatedLink = (isActive) =>
    `${isActive ? "text-yellow-300" : "text-white"} 
     font-semibold relative
     after:absolute after:left-0 after:bottom-[-3px]
     after:h-[2px] after:w-0 after:bg-yellow-300
     hover:after:w-full after:transition-all`;

  const links = (
    <ul className="flex items-center gap-8 text-white">
      <li>
        <NavLink to="/" className={({ isActive }) => animatedLink(isActive)}>
          Home
        </NavLink>
      </li>

      <li
        onClick={() => handleProtectedClick("/add-transaction")}
        className={`${animatedLink(location.pathname === "/add-transaction")} cursor-pointer`}
      >
        Add Transaction
      </li>

      <li
        onClick={() => handleProtectedClick("/my-transactions")}
        className={`${animatedLink(location.pathname === "/my-transactions")} cursor-pointer`}
      >
        My Transactions
      </li>

      <li
        onClick={() => handleProtectedClick("/reports")}
        className={`${animatedLink(location.pathname === "/reports")} cursor-pointer`}
      >
        Reports
      </li>

      {user && (
        <li>
          <NavLink
            to="/myprofile"
            className={({ isActive }) => animatedLink(isActive)}
          >
            My Profile
          </NavLink>
        </li>
      )}
    </ul>
  );

  return (
    <div className="navbar bg-gradient-to-r from-cyan-600 to-blue-600 px-4 lg:px-10 shadow-lg sticky top-0 z-50">

      <div className="w-full flex flex-col sm:hidden">

      
        <div className="flex items-center justify-between py-2">

          <div className="dropdown" onClick={(e) => e.stopPropagation()}>
            <label tabIndex={0} className="btn btn-ghost text-white px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16m-16 6h16" />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-xl w-56 mt-3 p-4 shadow-lg gap-2 border"
            >
              <li><NavLink to="/" className="text-gray-700">Home</NavLink></li>

              <li onClick={() => handleProtectedClick("/add-transaction")}><span className="text-gray-700">Add Transaction</span></li>

              <li onClick={() => handleProtectedClick("/my-transactions")}><span className="text-gray-700">My Transactions</span></li>

              <li onClick={() => handleProtectedClick("/reports")}><span className="text-gray-700">Reports</span></li>

              {user && (
                <li>
                  <NavLink to="/myprofile" className="text-gray-700">
                    My Profile
                  </NavLink>
                </li>
              )}

              {!user && (
                <>
                  <li><NavLink to="/register" className="text-gray-700">Register</NavLink></li>
                  <li><NavLink to="/login" className="text-gray-700">Login</NavLink></li>
                </>
              )}
            </ul>
          </div>

         
          <div className="flex items-center gap-2">
            <img src={logo} className="w-12 h-12 rounded-lg" />

            <h1 className="text-2xl font-bold text-white">
              Fin
              <span className="text-yellow-300 animate-pulse">
                Ease
              </span>
            </h1>
          </div>

         
          {user ? (
            <div
              className="relative"
              ref={mobileAvatarRef}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={user.photoURL}
                className="w-9 h-9 rounded-full border cursor-pointer"
                onClick={() => setOpenMobileAvatar(!openMobileAvatar)}
              />

              {openMobileAvatar && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg p-3 z-[999]">

                  <p className="font-semibold text-center">{user.displayName}</p>
                  <p className="text-sm text-gray-500 text-center">{user.email}</p>

                  <div className="divider my-1"></div>

                  <button
                    onClick={(e) => { e.stopPropagation(); handleSignOut(); }}
                    className="btn btn-error btn-xs w-full text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <input
              type="checkbox"
              className="toggle toggle-xs"
              onChange={(e) => handleTheme(e.target.checked)}
              defaultChecked={theme === "dark"}
            />
          )}
        </div>
      </div>

      <div className="navbar-start hidden sm:flex">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-12 h-12 rounded-lg" />
          <NavLink to="/" className="text-3xl font-bold text-white">
            Fin<span className="text-yellow-300 animate-pulse">Ease</span>
          </NavLink>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">{links}</div>

      <div className="navbar-end hidden sm:flex items-center gap-4">

        <input
          type="checkbox"
          onChange={(e) => handleTheme(e.target.checked)}
          defaultChecked={theme === "dark"}
          className="toggle toggle-sm"
        />
        
        {user ? (
          <div className="relative" ref={desktopAvatarRef}>
            <img
              src={user.photoURL}
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-white shadow"
              onClick={() => setOpenDesktopAvatar(!openDesktopAvatar)}
            />

            {openDesktopAvatar && (
              <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-lg p-4 border z-20">

                <p className="font-semibold text-center">{user.displayName}</p>
                <p className="text-sm text-gray-500 text-center">{user.email}</p>

                <div className="divider my-2"></div>

                <button
                  onClick={() => handleSignOut()}
                  className="btn btn-error btn-sm w-full text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <NavLink to="/register" className="btn btn-outline btn-warning btn-sm">
              Register
            </NavLink>
            <NavLink to="/login" className="btn btn-accent text-white btn-sm">
              Login
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
