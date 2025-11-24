import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { NavLink } from "react-router";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import login1 from "../../assets/artboard_copy_2x_4x.jpg"

const Register = () => {
  const { createUser, signInWithGoogle , updateUser , setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLengthValid = password.length >= 6;

    if (!hasUppercase) {
      Swal.fire("Warning", "Password must contain at least one uppercase letter!", "warning");
      return false;
    }
    if (!hasLowercase) {
      Swal.fire("Warning", "Password must contain at least one lowercase letter!", "warning");
      return false;
    }
    if (!isLengthValid) {
      Swal.fire("Warning", "Password must be at least 6 characters long!", "warning");
      return false;
    }
    return true;
  };

  const validatePhotoUrl = (photoUrl) => {
    if (!photoUrl || photoUrl.trim() === "") {
      Swal.fire("Warning", "Please provide your Photo URL!", "warning");
      return false;
    }
    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!validatePhotoUrl(formData.photoUrl)) return;
    if (!validatePassword(formData.password)) return;

    createUser(formData.email, formData.password)
      .then((result) => {
        const user = result.user;

        updateUser({displayName: formData.name,
          photoURL: formData.photoUrl,}).then(()=>{
            setUser({...user, displayName: formData.name,
          photoURL: formData.photoUrl});
          })

        updateProfile(user, {
          displayName: formData.name,
          photoURL: formData.photoUrl,
        })
          .then(() => {
            Swal.fire("Success!", "Registration successful!", "success");
            window.location.href = "/login";
          })
          .catch(() => {
            Swal.fire("Error", "Failed to update profile!", "error");
          });
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
        setUser(user);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => {
        console.log(result.user);
        
        const newUser = {
            name: result.user.displayName,
            email: result.user.email,
            image: result.user.photoURL
        }

        fetch('https://b12-a10-future-box-client-neon.vercel.app/users',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data =>{
            console.log('data after user save', data)
        })
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  return (
  <div className="min-h-screen w-full bg-[#eef4ff] flex items-center justify-center p-4">

    <div className="
      bg-white w-full max-w-5xl rounded-3xl shadow-xl 
      flex flex-col lg:flex-row overflow-hidden 
      md:max-w-4xl sm:max-w-lg
    ">

      <div className="
        w-full lg:w-1/2 flex items-center justify-center 
        p-4 sm:p-6 md:p-8 bg-white
      ">
        <img
          src={login1}
          alt="Illustration"
          className="
            w-full max-w-xs sm:max-w-sm md:max-w-md 
            lg:max-w-lg xl:max-w-xl object-contain
          "
        />
      </div>

      <div className="
        w-full lg:w-1/2 p-6 sm:p-8 md:p-10 
        flex flex-col justify-center
      ">
        <h1 className="
          text-3xl sm:text-4xl font-bold 
          mb-6 sm:mb-8 text-center lg:text-left text-black
        ">
          Register now!
        </h1>

        <div className="flex flex-col ">

          <form onSubmit={handleRegister} className="w-full flex justify-center">
            <fieldset className="fieldset w-full max-w-xs sm:max-w-sm">

              <label className="label text-black">Name</label>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Name"
                onChange={handleChange}
                required
              />

              <label className="label text-black">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                onChange={handleChange}
                required
              />

              <label className="label text-black">Photo URL</label>
              <input
                type="text"
                name="photoUrl"
                className="input"
                placeholder="Photo URL"
                onChange={handleChange}
                required
              />

              <label className="label text-black">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
                onChange={handleChange}
                required
              />

              <button 
                type="submit"
                className="
                  sm:w-[320px] w-full h-[45px] bg-[#96f409] text-white 
                  rounded-lg font-semibold mt-4
                  hover:bg-[#3b57d1] transition
                "
              >
                Register
              </button>
            </fieldset>
          </form>

          <div className="sm:px-38 my-3 text-gray-500 px-28">or</div>

          <button
            onClick={handleGoogleSignIn}
            className="
              sm:w-[320px] w-full h-[45px] bg-white border text-black rounded-lg font-semibold 
             hover:bg-[#3b57d1] transition
            "
          >
            Sign up with Google
          </button>
          <div className="font-semibold text-center pt-4 text-black">
            Already have an account?{" "}
            <NavLink to="/login" className="text-primary">
              Sign in
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  </div>
);

};

export default Register;
