import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { NavLink } from "react-router";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ইনপুট পরিবর্তন হ্যান্ডল করা
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ফর্ম সাবমিট করলে লগইন
  const handleLogin = (e) => {
    e.preventDefault();
    signInUser(formData.email, formData.password)
      .then(() => {
        window.location.href = "/"; // ✅ navigate ছাড়া redirect
      })
      .catch((error) => {
        console.log("Login error:", error.message);
        alert("Invalid email or password!");
      });
  };

  // Google Sign In
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        window.location.href = "/"; // ✅ navigate ছাড়া redirect
      })
      .catch((error) => {
        console.log("Google sign-in error:", error.message);
      });
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl py-10 m-10">
      <h1 className="text-4xl font-bold text-center">Sign In Now!</h1>

      <div className="card-body">
        <form onSubmit={handleLogin}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div>
              <a className="link link-hover text-sm">Forgot password?</a>
            </div>

            <button type="submit" className="btn btn-neutral mt-4 w-full">
              Sign In
            </button>
          </fieldset>
        </form>

        <h2 className="text-center mt-2">or</h2>

        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border-[#e5e5e5] w-full"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>

        <div className="font-semibold text-center pt-4">
          Don't have an account?{" "}
          <NavLink to="/register" className="text-primary">
            Register Now
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
