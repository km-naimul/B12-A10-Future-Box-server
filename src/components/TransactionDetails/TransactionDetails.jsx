import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";

const TransactionDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [transaction, setTransaction] = useState(null);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    // Fetch single transaction
    fetch(`http://localhost:3000/transactions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTransaction(data);

        // Fetch all transactions in same category but ONLY for same user & same type
        fetch(
          `http://localhost:3000/transactions?category=${data.category}&email=${user.email}&type=${data.type}`
        )
          .then((res) => res.json())
          .then((allCategoryData) => {
            const total = allCategoryData.reduce(
              (sum, t) => sum + Number(t.amount || 0),
              0
            );
            setCategoryTotal(total);
          });
      })
      .catch(() => {
        Swal.fire("Error", "Failed to load transaction details.", "error");
      });
  }, [id, user]);

  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center p-6">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl p-6">
        <h2
          className={`text-3xl font-bold mb-4 text-center ${
            transaction.type === "income" ? "text-green-600" : "text-red-600"
          }`}
        >
          Transaction Details
        </h2>

        <div className="space-y-3">
          <p>
            <strong>Type:</strong> {transaction.type}
          </p>
          <p>
            <strong>Category:</strong> {transaction.category}
          </p>
          <p>
            <strong>Description:</strong> {transaction.description}
          </p>
          <p>
            <strong>Amount:</strong> ${transaction.amount}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(transaction.date).toLocaleDateString()}
          </p>

          {/* 🔥 Total only for this category + same type + same user */}
          <p className="font-semibold text-primary">
            <strong>Total in this Category ({transaction.type}):</strong>{" "}
            ${categoryTotal.toFixed(2)}
          </p>
        </div>

        <div className="card-actions justify-center mt-6">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/my-transactions")}
          >
            ⬅ Back to My Transactions
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
