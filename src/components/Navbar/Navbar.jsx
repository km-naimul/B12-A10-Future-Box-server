import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import logo from "../../assets/design-eye-catching-financial-logo.jpg";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        window.location.href = "/login";
      })
      .catch((error) => console.log(error));
  };

  const links = (
    <>
      <li className="font-semibold">
        <NavLink to="/">Home</NavLink>
      </li>

      {user && (
        <>
          <li className="font-semibold">
            <NavLink to="/addTransaction">Add Transaction</NavLink>
          </li>
          <li className="font-semibold">
            <NavLink to="/mytransactions">My Transactions</NavLink>
          </li>
          <li className="font-semibold">
            <NavLink to="/reports">Reports</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-gradient-to-r from-primary/20 via-base-200 to-secondary/20 shadow-sm">
      {/* Left Section */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
            <li className="font-semibold">
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
        </div>

        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-12 h-12 object-contain py-2" />
          <a className="text-4xl font-bold flex items-center">
            Fin <span className="text-primary">Ease</span>
          </a>
        </div>
      </div>

      {/* Center Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end gap-3">
        {user ? (
          <div className="relative">
            {/* Profile Photo */}
            <img
              src={user.photoURL || "https://i.ibb.co/3d8YQfP/default-user.png"}
              alt="User"
              className="w-10 h-10 rounded-full cursor-pointer border border-primary"
              onClick={() => setOpen(!open)}
            />

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-56 bg-white shadow-md rounded-xl p-4 border border-gray-100 z-10">
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
