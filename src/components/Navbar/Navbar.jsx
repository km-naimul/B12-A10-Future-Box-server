import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router";
import logo from "../../assets/design-eye-catching-financial-logo.jpg";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const [theme,setTheme] = useState(localStorage.getItem('theme')|| "light" )

  useEffect(()=>{
    const html = document.querySelector('html')
    html.setAttribute("data-theme",theme)
    localStorage.setItem("theme",theme)
  }, [theme])
  const handleTheme = (checked) => {
    setTheme(checked? "dark":"light")
  }
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleOutsideClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSignOut = () => {
    signOutUser()
      .then(() => (window.location.href = "/login"))
      .catch((error) => console.log(error));
  };

  const handleProtectedClick = (path) => {
    user ? navigate(path) : navigate("/login");
  };

  // Desktop Links
  const links = (
    <ul className="flex items-center gap-6">
      <li className="font-semibold">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-300"
              : "text-gray-700 hover:text-white transition"
          }
        >
          Home
        </NavLink>
      </li>

      <li
        onClick={() => handleProtectedClick("/add-transaction")}
        className={`font-semibold cursor-pointer ${
          location.pathname === "/add-transaction"
            ? "text-yellow-300"
            : "text-gray-700"
        } hover:text-white transition`}
      >
        Add Transaction
      </li>

      <li
        onClick={() => handleProtectedClick("/my-transactions")}
        className={`font-semibold cursor-pointer ${
          location.pathname === "/my-transactions"
            ? "text-yellow-300"
            : "text-gray-700"
        } hover:text-white transition`}
      >
        My Transactions
      </li>

      <li
        onClick={() => handleProtectedClick("/reports")}
        className={`font-semibold cursor-pointer ${
          location.pathname === "/reports"
            ? "text-yellow-300"
            : "text-gray-700"
        } hover:text-white transition`}
      >
        Reports
      </li>

      {user && (
        <li
          className={`font-semibold cursor-pointer ${
            location.pathname === "/myprofile"
              ? "text-yellow-300"
              : "text-gray-700"
          } hover:text-white transition`}
        >
          <NavLink to="/myprofile">My Profile</NavLink>
        </li>
      )}
    </ul>
  );

  return (
    <div className="navbar bg-linear-to-r from-cyan-500 to-blue-500 px-4 lg:px-10 shadow">
      <div className="navbar-start">

        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-16 6h16" />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-xl w-56 mt-3 p-3 shadow-xl flex flex-col gap-3"
          >
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-yellow-500 font-bold" : "text-gray-700"
                }
              >
                Home
              </NavLink>
            </li>

            <li onClick={() => handleProtectedClick("/add-transaction")}>
              <span
                className={`${
                  location.pathname === "/add-transaction"
                    ? "text-yellow-500 font-bold"
                    : "text-gray-700"
                }`}
              >
                Add Transaction
              </span>
            </li>

            <li onClick={() => handleProtectedClick("/my-transactions")}>
              <span
                className={`${
                  location.pathname === "/my-transactions"
                    ? "text-yellow-500 font-bold"
                    : "text-gray-700"
                }`}
              >
                My Transactions
              </span>
            </li>

            <li onClick={() => handleProtectedClick("/reports")}>
              <span
                className={`${
                  location.pathname === "/reports"
                    ? "text-yellow-500 font-bold"
                    : "text-gray-700"
                }`}
              >
                Reports
              </span>
            </li>

            {user && (
              <li>
                <NavLink
                  to="/myprofile"
                  className={({ isActive }) =>
                    isActive ? "text-yellow-500 font-bold" : "text-gray-700"
                  }
                >
                  My Profile
                </NavLink>
              </li>
            )}

            {!user && (
              <li>
                <NavLink to="/register" className="text-gray-700">
                  Register
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-12 h-12 object-contain py-2" />

          <NavLink to="/" className="text-4xl font-bold flex items-center ml-2">
            Fin <span className="text-primary">Ease</span>
          </NavLink>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">{links}</div>

      {/* Right User Section */}
      <div className="navbar-end gap-3">
            <input
           onChange={(e)=>handleTheme(e.target.checked)}
           type="checkbox"
           defaultChecked={localStorage.getItem('theme') === "dark"}
           className="toggle"/>

        {user ? (
          <div className="relative" ref={dropdownRef}>
            <img
              src={user.photoURL || "https://i.ibb.co/3d8YQfP/default-user.png"}
              alt="User"
              className="w-10 h-10 rounded-full cursor-pointer border border-primary"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="absolute right-0 mt-2 w-56 bg-white shadow-md rounded-xl p-4 border z-10">
                <div className="text-center mb-2">
                  <p className="font-semibold">{user.displayName || "User"}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <div className="divider my-1"></div>

                <button
                  onClick={handleSignOut}
                  className="btn btn-error w-full text-white"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <NavLink
              to="/register"
              className="btn btn-outline btn-primary font-semibold"
            >
              Register
            </NavLink>

            <NavLink
              to="/login"
              className="btn btn-accent text-white font-semibold"
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
