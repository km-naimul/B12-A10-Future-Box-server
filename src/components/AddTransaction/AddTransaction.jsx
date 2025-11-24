import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";
import register from "../../assets/online-shopping-vector-61386614.jpg"
const AddTransaction = () => {
  const { user } = useContext(AuthContext); // logged-in user info
  const [formData, setFormData] = useState({
    type: "income",
    category: "",
    amount: "",
    description: "",
    date: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = {
  ...formData,
  email: user?.email,
  name: user?.displayName,
  amount: Number(formData.amount) 
};

    try {
      const res = await fetch("https://b12-a10-future-box-client-neon.vercel.app/transactions", {
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
   <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center gap-2 p-6">

  <div className="lg:w-1/2 flex justify-center">
    <img
      src={register}
      alt="Register Illustration"
      className="w-[90%] max-w-md drop-shadow-xl rounded-2xl"
    />
  </div>

  <div className="lg:w-1/2 w-full max-w-xl bg-[#87ceeb] rounded-2xl shadow-lg p-8"
>
    <h2 className="text-3xl font-bold text-center mb-6 text-[#191970]">
      Add New Transaction
    </h2>
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label className="label font-semibold ">Type</label>
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
          <option value="Others">Others</option>
        </select>
      </div>

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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label font-semibold">User Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full "
          />
        </div>
        <div>
          <label className="label font-semibold">User Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full "
          />
        </div>
      </div>
      
      <div className="text-center mt-6">
        <button type="submit" className="btn bg-[#191970] text-white w-full hover:bg-blue-600 ">
          Add Transaction
        </button>
      </div>

    </form>
  </div>
</div>
   
  );
};

export default AddTransaction;
