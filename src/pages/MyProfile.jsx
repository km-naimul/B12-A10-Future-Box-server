import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import Swal from "sweetalert2";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

const MyProfile = () => {
  const { user, updateUser, setUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [smsActive, setSmsActive] = useState(true);

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
  });

  if (!user) {
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        Please log in to view your profile.
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser({
      displayName: formData.name,
      photoURL: formData.photoURL,
    })
      .then(() => {
        setUser({
          ...user,
          displayName: formData.name,
          photoURL: formData.photoURL,
        });
        Swal.fire("Updated!", "Profile updated successfully!", "success");
        setEditMode(false);
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  return (
    <div className="flex justify-center mt-10 px-4 mb-4">
      <div className="bg-blue-200 w-full max-w-md shadow-xl rounded-3xl p-6 text-center relative">

        {/* PROFILE IMAGE */}
        <img
          src={user.photoURL || "https://i.ibb.co/3d8YQfP/default-user.png"}
          className="w-40 h-40 object-cover mx-auto rounded-2xl shadow-md"
          alt="Profile"
        />

        <h2 className="text-xl font-bold mt-2 text-black">My Profile</h2>
        <div className="mt-3 border-t pt-3 text-left space-y-5">

          <div>
            <p className="text-lg font-semibold text-black">{formData.name}</p>

            <div className="flex items-center gap-2 text-gray-600 mt-1">
              <PhoneIcon className="w-5 h-5 text-gray-500" />
              <span>{user.phoneNumber || "+8801 --- --- ----"}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <EnvelopeIcon className="w-5 h-5 text-gray-500" />
            <span>{formData.email}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center px-2">
          <span className="text-orange-500 font-medium">SMS alerts activation</span>
          <div
            className={`w-5 h-5 rounded-full cursor-pointer transition-all ${
              smsActive ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={() => setSmsActive(!smsActive)}
          ></div>
        </div>

        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="mt-6 w-full py-2 rounded-full text-white 
                       bg-gradient-to-r from-orange-400 to-pink-500 shadow-md btn btn-ghost"
          >
             Update Profile <span className="font-medium text-green-300">(Click here)</span>
          </button>
        ) : (
          <form onSubmit={handleUpdate} className="mt-6 space-y-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Your Name"
            />

            <input
              disabled
              type="email"
              value={formData.email}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Photo URL"
            />

            <button
              type="submit"
              className="w-full py-2 rounded-full text-white 
                         bg-gradient-to-r from-orange-400 to-pink-500 shadow-md btn btn-ghost"
            >
              Save Changes
            </button>

            <button
              onClick={() => setEditMode(false)}
              type="button"
              className="btn w-full"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
