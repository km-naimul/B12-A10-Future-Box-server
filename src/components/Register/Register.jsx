import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { NavLink } from "react-router";

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    createUser(formData.email, formData.password)
      .then(() => {
        window.location.href = "/login"; // ✅ navigate ছাড়াই redirect
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        window.location.href = "/"; // ✅ navigate ছাড়াই redirect
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl py-10 m-10">
      <h1 className="text-4xl font-bold text-center">Register now!</h1>
      <div className="card-body">
        <form onSubmit={handleRegister}>
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Name"
              onChange={handleChange}
              required
            />
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <label className="label">Photo URL</label>
            <input
              type="text"
              name="photoUrl"
              className="input"
              placeholder="Photo URL"
              onChange={handleChange}
            />
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn btn-neutral mt-4">
              Register
            </button>
          </fieldset>
        </form>

        <h2 className="text-center mt-2">or</h2>

        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border-[#e5e5e5]"
        >
          Login with Google
        </button>

        <div className="font-semibold text-center pt-2">
          Already have an account?{" "}
          <NavLink to="/login" className="text-primary">
            Sign in
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
