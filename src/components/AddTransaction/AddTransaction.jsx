import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";

const AddTransaction = () => {
  const { user } = useContext(AuthContext); // logged-in user info
  const [formData, setFormData] = useState({
    type: "income",
    category: "",
    amount: "",
    description: "",
    date: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = {
  ...formData,
  email: user?.email,
  name: user?.displayName,
  amount: Number(formData.amount) // <-- এখানে string কে Number এ convert করা হয়েছে
};

    try {
      const res = await fetch("http://localhost:3000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Transaction Added!",
          text: "Your transaction has been successfully saved.",
          timer: 2000,
          showConfirmButton: false,
        });
        setFormData({
          type: "income",
          category: "",
          amount: "",
          description: "",
          date: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to add transaction. Try again.",
        });
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Please check your connection or server.",
      });
    }
  };


  return (
    <div className="max-w-xl mx-auto bg-base-200 rounded-2xl shadow-md p-6 mt-10 mb-5">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        Add New Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type */}
        <div>
          <label className="label font-semibold">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="label font-semibold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Category</option>
            <option value="home">Home</option>
            <option value="food">Food</option>
            <option value="salary">Salary</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="label font-semibold">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter amount"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="label font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            placeholder="Add a short description"
          ></textarea>
        </div>

        {/* Date */}
        <div>
          <label className="label font-semibold">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Email & Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label font-semibold">User Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="label font-semibold">User Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6 ">
          <button type="submit" className="btn btn-primary w-full">
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
