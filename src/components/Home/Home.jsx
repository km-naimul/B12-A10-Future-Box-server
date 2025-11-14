import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  const fetchTransactions = () => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/transaction-balance?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);

        const totalIncome = data
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + Number(t.amount || 0), 0);

        const totalExpense = data
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + Number(t.amount || 0), 0);

        setIncome(totalIncome);
        setExpense(totalExpense);
        setBalance(totalIncome - totalExpense);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTransactions(); 

    const interval = setInterval(fetchTransactions, 5000);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-600 to-teal-500 text-white rounded-2xl p-10 mx-4 md:mx-8 mt-8 shadow-lg text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Take Control of Your Money
        </h1>
        <p className="mt-3 text-lg md:text-xl opacity-90">
          Track, budget, and grow — all in one place.
        </p>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8 mt-10">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-50 shadow-md hover:shadow-lg transition">
          <div className="font-semibold text-gray-700">💰 Total Balance</div>
          <div className="text-4xl font-bold text-teal-700 mt-2">
            ${balance.toLocaleString()}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-100 to-cyan-50 shadow-md hover:shadow-lg transition">
          <div className="font-semibold text-gray-700">📈 Total Income</div>
          <div className="text-4xl font-bold text-cyan-700 mt-2">
            ${income.toLocaleString()}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-red-100 to-pink-50 shadow-md hover:shadow-lg transition">
          <div className="font-semibold text-gray-700">📉 Total Expense</div>
          <div className="text-4xl font-bold text-red-700 mt-2">
            ${expense.toLocaleString()}
          </div>
        </div>
      </section>

      <section className="mt-10 grid md:grid-cols-2 gap-6 px-4 md:px-8 pb-10">
        <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
          <h3 className="font-bold text-lg text-gray-800">Budgeting Tips</h3>
          <p className="mt-2 text-gray-600">
            Track all your expenses carefully, set realistic goals, and review
            your spending habits regularly to stay on top of your finances.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
          <h3 className="font-bold text-lg text-gray-800">
            Why Financial Planning Matters
          </h3>
          <p className="mt-2 text-gray-600">
            Small, consistent financial habits lead to long-term success. Start
            early, plan wisely, and watch your wealth grow over time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
