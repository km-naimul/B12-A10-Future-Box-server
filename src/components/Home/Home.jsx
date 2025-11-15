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
       
       <marquee behavior="" direction="" gradient={true}>
        <p className="mt-3 text-lg italic md:text-xl opacity-90 text-black font-semibold">
         Plan your finances, control your future — your money should work for you, not against you.

        </p>
       </marquee>
       
        
      </section>
    <p>

    </p>
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

  {/* ⭐ Budgeting Tips Card */}
  <div className="p-6 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
      💡 Budgeting Tips
    </h3>

    <p className="mt-2 text-gray-600 leading-relaxed">
      Budgeting helps you gain control over your finances, avoid unnecessary
      spending, and plan for future goals. A well-structured budget acts as the
      foundation of financial stability.
    </p>

    <ul className="mt-4 space-y-3 text-gray-700">
      <li className="flex gap-2">
        <span className="text-green-600 text-xl">✔</span>
        Track every expense — knowing where your money goes is the first step.
      </li>

      <li className="flex gap-2">
        <span className="text-green-600 text-xl">✔</span>
        Follow the 50/30/20 rule: 50% needs, 30% wants, 20% savings.
      </li>

      <li className="flex gap-2">
        <span className="text-green-600 text-xl">✔</span>
        Review & adjust your budget every month.
      </li>

      <li className="flex gap-2">
        <span className="text-green-600 text-xl">✔</span>
        Set realistic spending limits & avoid impulse purchases.
      </li>

      <li className="flex gap-2">
        <span className="text-green-600 text-xl">✔</span>
        Save first, spend later: always prioritize savings.
      </li>
    </ul>

    <p className="mt-4 italic text-gray-500">
      “A small change in spending habits today creates big financial wins
      tomorrow.”
    </p>
  </div>

  {/* ⭐ Why Financial Planning Matters Card */}
  <div className="p-6 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
      📊 Why Financial Planning Matters ?
    </h3>

    <p className="mt-2 text-gray-600 leading-relaxed">
      Financial planning gives you clarity, direction, and confidence in managing
      your money. Whether you’re building savings, paying off debt, or planning
      long-term goals—planning makes everything achievable.
    </p>

    <ul className="mt-4 space-y-3 text-gray-700">
      <li className="flex gap-2">
        <span className="text-blue-600 text-xl">✔</span>
        Helps you avoid debt and build long-term wealth.
      </li>

      <li className="flex gap-2">
        <span className="text-blue-600 text-xl">✔</span>
        Keeps you prepared for emergencies with a solid backup plan.
      </li>

      <li className="flex gap-2">
        <span className="text-blue-600 text-xl">✔</span>
        Makes major life goals (car, home, education) easier to achieve.
      </li>

      <li className="flex gap-2">
        <span className="text-blue-600 text-xl">✔</span>
        Improves mental peace by reducing financial stress.
      </li>

      <li className="flex gap-2">
        <span className="text-blue-600 text-xl">✔</span>
        Encourages consistent saving and smart investing.
      </li>
    </ul>

    <p className="mt-4 italic text-gray-500">
      “If you fail to plan, you plan to fail — financial planning is your roadmap
      to success.”
    </p>
  </div>

</section>

    </div>
  );
};

export default Home;
