import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";

const MyTransactions = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [sortBy, setSortBy] = useState("date"); // sort state
  const navigate = useNavigate();

  // fetch transactions with sort
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/transactions?email=${user.email}&sort=${sortBy}`)
        .then((res) => res.json())
        .then((data) => setTransactions(data))
        .catch((err) => console.error(err));
    }
  }, [user, sortBy]);

  // delete transaction
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this transaction?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/transactions/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then(() => {
            setTransactions(transactions.filter((t) => t._id !== id));
            Swal.fire("Deleted!", "Your transaction has been removed.", "success");
          });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-teal-600">
        My Transactions
      </h2>

      {/* Sort Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setSortBy("date")}
          className={`btn btn-sm ${sortBy === "date" ? "btn-primary" : "btn-outline"}`}
        >
          Sort by Date
        </button>
        <button
          onClick={() => setSortBy("amount")}
          className={`btn btn-sm ${sortBy === "amount" ? "btn-primary" : "btn-outline"}`}
        >
          Sort by Amount
        </button>
      </div>

      {/* Transactions Grid */}
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No transactions found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {transactions.map((t) => (
            <div key={t._id} className="card bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all rounded-2xl">
              <div className="card-body p-5">
                <div className="flex justify-between items-center">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      t.type === "income" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {t.type.toUpperCase()}
                  </span>
                  <span className="text-gray-400 text-sm">{new Date(t.date).toLocaleDateString()}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mt-3">
                  {t.category.charAt(0).toUpperCase() + t.category.slice(1)}
                </h3>

                <p className="mt-2 text-gray-600 line-clamp-2">
                  {t.description || "No description available."}
                </p>

                <p className={`text-2xl font-bold mt-4 ${t.type === "income" ? "text-green-600" : "text-red-600"}`}>
                  ${t.amount}
                </p>

                <div className="mt-5 flex justify-between">
                  <button onClick={() => navigate(`/transaction/${t._id}`)} className="btn btn-sm bg-cyan-500 text-white hover:bg-cyan-600 border-none">
                    View
                  </button>
                  <button onClick={() => navigate(`/transaction/update/${t._id}`)} className="btn btn-sm bg-amber-500 text-white hover:bg-amber-600 border-none">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(t._id)} className="btn btn-sm bg-red-500 text-white hover:bg-red-600 border-none">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTransactions;
