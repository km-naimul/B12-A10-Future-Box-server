import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";
import details from "../../assets/retail-software-cloud-pos-chargeback-card-on-file-sale-and-transaction-data-storage-pay-back-bank-account-money-transfer-set-flat-vector-moder-2M9ETCA.jpg";

const TransactionDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [transaction, setTransaction] = useState(null);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://b12-a10-future-box-client-neon.vercel.app/transactions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTransaction(data);

        fetch(
          `https://b12-a10-future-box-client-neon.vercel.app/transactions?category=${data.category}&email=${user.email}&type=${data.type}`
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
    <div
      className="min-h-screen flex justify-center items-center p-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${details})` }}
    >
      <div className="inset-0 bg-white/10"></div>

      <div className="relative card w-full max-w-xl bg-sky-200 shadow-2xl p-8 rounded-2xl border border-gray-200">
        <h2
          className={`text-4xl font-extrabold text-center mb-6 tracking-wide ${
            transaction.type === "income"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          Transaction Details
        </h2>

        <div className="space-y-4 text-lg text-gray-700">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-semibold">Type:</span>
            <span
              className={`font-bold px-3 py-1 rounded-full text-white ${
                transaction.type === "income"
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >
              {transaction.type.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-semibold">Category:</span>
            <span>{transaction.category}</span>
          </div>

          <div className="border-b pb-2 flex items-center justify-between">
            <p className="font-semibold mb-1">Description:</p>
            <p className="text-gray-600">
              {transaction.description || "No description provided."}
            </p>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-semibold">Amount:</span>
            <span
              className={`text-xl font-bold ${
                transaction.type === "income"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              ${transaction.amount}
            </span>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-semibold">Date:</span>
            <span>{new Date(transaction.date).toLocaleDateString()}</span>
          </div>

          <div className="pt-2 text-center">
            <p className="font-semibold text-primary text-lg">
              Total in this Category ({transaction.category}):{" "}
              <span className="font-bold">${categoryTotal.toFixed(2)}</span>
            </p>
          </div>
        </div>

        <div className="card-actions justify-center mt-8">
          <button
            className="btn bg-yellow-500 px-8 hover:bg-primary text-base-100"
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
