import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import income from "../../assets/Accounting-Services-Cost-Saving.jpg";
import expense from "../../assets/pile-of-money-bags-and-arrows-down-financial-and-business-vector.jpg";

const MyTransactions = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(true); // <-- ADDED
  const navigate = useNavigate();

  // Fetch transactions with sorting
  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://b12-a10-future-box-client-neon.vercel.app/transactions?email=${user.email}&sort=${sortBy}`
      )
        .then((res) => res.json())
        .then((data) => {
          setTransactions(data);

          setTimeout(() => setLoading(false), 800); 
        })
        .catch((err) => console.error(err));
    }
  }, [user, sortBy]);

  
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
        fetch(`https://b12-a10-future-box-client-neon.vercel.app/transactions/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then(() => {
            setTransactions(transactions.filter((t) => t._id !== id));
            Swal.fire("Deleted!", "Your transaction has been removed.", "success");
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="w-20 h-20 rounded-full border-4 border-transparent border-t-blue-500 animate-spin
          bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-1">
          <div className="w-full h-full bg-base-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  
  return (
    <div className=" mx-auto p-8 w-full min-h-screen">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-teal-600">
        My Transactions
      </h2>

     
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setSortBy("date")}
          className={`btn btn-sm ${
            sortBy === "date" ? "btn-primary" : "btn-outline"
          }`}
        >
          Sort by Date
        </button>
        <button
          onClick={() => setSortBy("amount")}
          className={`btn btn-sm ${
            sortBy === "amount" ? "btn-primary" : "btn-outline"
          }`}
        >
          Sort by Amount
        </button>
      </div>

    
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No transactions found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {transactions.map((t) => (
            <div
              key={t._id}
              className="relative rounded-xl shadow-lg p-5 hover:shadow-2xl transition-all overflow-hidden border border-gray-200 dark:border-gray-700"
              style={{
                backgroundImage: `url(${
                  t.type === "income" ? income : expense
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              
              <div className="absolute inset-0 bg-white/70 dark:bg-black/60 "></div>

              <div className="relative">
                {/* Top Row — Type + Date */}
                <div className="flex flex-col items-center bg-white/100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                  <span
                    className={`w-full text-xs font-semibold badge ${
                      t.type === "income"
                        ? "bg-green-300 text-black font-bold"
                        : "bg-red-300 text-black font-bold"
                    }`}
                  >
                    {t.type.toUpperCase()}
                  </span>

                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    Date: {new Date(t.date).toLocaleDateString()}
                  </span>
                </div>

              
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Category:
                  </p>
                  <p className="text-base dark:text-white">
                    {t.category.charAt(0).toUpperCase() + t.category.slice(1)}
                  </p>
                </div>

               
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Amount:
                  </p>
                  <p
                    className={`text-xl font-bold ${
                      t.type === "income" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    ${t.amount}
                  </p>
                </div>

               
                <div className="mt-3">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Description:
                  </p>
                  <p className="text-black dark:text-gray-100 line-clamp-2">
                    {t.description || "No description available."}
                  </p>
                </div>

            
                <div className="flex w-full flex-col space-y-2 mt-4">
                  <button
                    onClick={() => navigate(`/transaction/${t._id}`)}
                    className="btn btn-sm bg-gray-500 text-white hover:bg-blue-600 border-none"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => navigate(`/transaction/update/${t._id}`)}
                    className="btn btn-sm bg-amber-500 text-white hover:bg-blue-600 border-none"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(t._id)}
                    className="btn btn-sm bg-red-500 text-white hover:bg-blue-600 border-none"
                  >
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
