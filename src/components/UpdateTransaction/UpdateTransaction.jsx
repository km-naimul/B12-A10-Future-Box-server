import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState(null);
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    amount: "",
    date: "",
    category: "",
  });

  const [categoryTotal, setCategoryTotal] = useState(0);

  useEffect(() => {
    fetch(`https://b12-a10-future-box-client-neon.vercel.app/transactions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTransaction(data);
        setFormData({
          type: data.type,
          description: data.description,
          amount: data.amount,
          date: data.date,
          category: data.category,
        });

        fetch(
          `https://b12-a10-future-box-client-neon.vercel.app/transactions?email=${data.email}`
        )
          .then((res) => res.json())
          .then((all) => {
            const total = all
              .filter((t) => t.category === data.category)
              .reduce((sum, t) => sum + Number(t.amount), 0);

            setCategoryTotal(total);
          });
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


    const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`https://b12-a10-future-box-client-neon.vercel.app/transactions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Transaction Updated Successfully!", {
          position: "top-center",
        });

        setTimeout(() => {
          navigate("/my-transactions");
        }, 1200);
      });
  };


  if (!transaction)
    return (
      <p className="text-center mt-20 text-lg font-semibold text-gray-500">
        Loading...
      </p>
    );

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-sky-200 rounded-2xl shadow-lg mb-4">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">
        Update Transaction
      </h1>

      <form onSubmit={handleUpdate} className="space-y-5">

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
          <p className="text-xs text-gray-500">Current: {transaction.type}</p>
        </div>

        <div>
          <label className="label font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          />
          <p className="text-xs text-gray-500">
            Current: {transaction.description}
          </p>
        </div>

        <div>
          <label className="label font-semibold">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <p className="text-xs text-gray-500">
            Current: ${transaction.amount}
          </p>
        </div>


        <div>
          <label className="label font-semibold">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <p className="text-xs text-gray-500">
            Current: {new Date(transaction.date).toLocaleDateString()}
          </p>
        </div>

 
        <div>
          <label className="label font-semibold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="food">Food</option>
            <option value="salary">Salary</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="home">Home</option>
            <option value="home">Others</option>
          </select>
          <p className="text-xs text-gray-500">
            Current: {transaction.category}
          </p>
        </div>

   
        <div className="mt-4 p-4 bg-base-100 rounded-lg shadow">
          <h3 className="font-semibold text-lg">Total Amount In This Category:</h3>
          <p className="text-xl font-bold text-primary">${categoryTotal}</p>
        </div>

        <button type="submit" className="btn bg-yellow-500 w-full mt-4 hover:bg-primary text-base-100">
          Update Transaction
        </button>
      </form>
    </div>
  );
};

export default UpdateTransaction;
