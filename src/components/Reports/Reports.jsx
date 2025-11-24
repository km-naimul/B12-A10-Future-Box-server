import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Swal from "sweetalert2";

const Reports = () => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [budgetMonthView, setBudgetMonthView] = useState("");
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [savings, setSavings] = useState([]);
  const [expenseSummary, setExpenseSummary] = useState([]);

  const [newBudget, setNewBudget] = useState({
    category: "",
    amount: "",
    month: "",
  });

  const COLORS = ["#00C49F", "#FF8042", "#FFBB28", "#8884D8", "#0088FE"];

  useEffect(() => {
    if (!user?.email) return;

    Promise.all([
      loadTransactions(),
      loadBudgets(),
      loadSavings(),
      loadExpenseSummary(),
    ]).then(() => {
      setTimeout(() => setLoading(false), 800);
    });
  }, [user]);

  const loadTransactions = () =>
    fetch(`https://b12-a10-future-box-client-neon.vercel.app/transactions?email=${user.email}`)
      .then((r) => r.json())
      .then((d) => {
        setTransactions(Array.isArray(d) ? d : []);
        setFilteredData(Array.isArray(d) ? d : []);
      });

  const loadBudgets = () =>
    fetch(`https://b12-a10-future-box-client-neon.vercel.app/budget?email=${user.email}`)
      .then((r) => r.json())
      .then((d) =>
        setBudgets(
          Array.isArray(d)
            ? d.map((b) => ({ ...b, month: Number(b.month) || 0 }))
            : []
        )
      );

  const loadSavings = () =>
    fetch(`https://b12-a10-future-box-client-neon.vercel.app/savings?email=${user.email}`)
      .then((r) => r.json())
      .then((d) => setSavings(Array.isArray(d) ? d : []));

  const loadExpenseSummary = () =>
    fetch(`https://b12-a10-future-box-client-neon.vercel.app/expenses-summary?email=${user.email}`)
      .then((r) => r.json())
      .then((d) => setExpenseSummary(Array.isArray(d) ? d : []));

  useEffect(() => {
    const unique = [
      ...new Set(transactions.map((t) => t.category).filter(Boolean)),
    ];
    setCategories(unique);
  }, [transactions]);

  useEffect(() => {
    if (!selectedMonth) return setFilteredData(transactions);

    const m = Number(selectedMonth);

    const f = transactions.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() + 1 === m;
    });

    setFilteredData(f);
  }, [selectedMonth, transactions]);

  const monthName = (m) => {
    if (!m || m === "0") return "All Months";
    return new Date(0, Number(m) - 1).toLocaleString("default", {
      month: "long",
    });
  };

  const incomePie = Object.values(
    filteredData
      .filter((t) => t.type === "income")
      .reduce((acc, t) => {
        const cat = t.category || "Uncategorized";
        acc[cat] = acc[cat] || { name: cat, value: 0 };
        acc[cat].value += Number(t.amount);
        return acc;
      }, {})
  );

  const expensePie = Object.values(
    filteredData
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        const cat = t.category || "Uncategorized";
        acc[cat] = acc[cat] || { name: cat, value: 0 };
        acc[cat].value += Number(t.amount);
        return acc;
      }, {})
  );

  const monthlyIncomeExpense = Array.from({ length: 12 }, (_, i) => {
    const short = new Date(0, i).toLocaleString("default", { month: "short" });

    const income = transactions
      .filter(
        (t) => t.type === "income" && new Date(t.date).getMonth() === i
      )
      .reduce((s, t) => s + Number(t.amount), 0);

    const expense = transactions
      .filter(
        (t) => t.type === "expense" && new Date(t.date).getMonth() === i
      )
      .reduce((s, t) => s + Number(t.amount), 0);

    return { month: short, income, expense };
  });
  const getMonthlyCategoryExpense = (month) => {
    const m = Number(month);

    const filtered =
      !m || m === 0
        ? transactions.filter((t) => t.type === "expense")
        : transactions.filter((t) => {
            const d = new Date(t.date);
            return t.type === "expense" && d.getMonth() + 1 === m;
          });
    const map = filtered.reduce((acc, t) => {
      const cat = t.category || "Uncategorized";
      acc[cat] = acc[cat] || 0;
      acc[cat] += Number(t.amount);
      return acc;
    }, {});
    return map;
  };
  const monthlyMergedBudget = (month) => {
    const m = month === "" ? 0 : Number(month);
    const expMap = getMonthlyCategoryExpense(m);
    const budgetsSelected = budgets.filter((b) => b.month === m || b.month === 0);
    const expenseCategories = Object.keys(expMap);
    const budgetCategories = budgetsSelected.map((b) => b.category);
    const fromBudgets = budgetsSelected.map((b) => ({
      name: b.category,
      used: expMap[b.category] || 0,
      total: b.amount,
      percent: b.amount ? (expMap[b.category] / b.amount) * 100 : 0,
    }));
    const extraExpenses = expenseCategories
      .filter((c) => !budgetCategories.includes(c))
      .map((c) => ({
        name: c,
        used: expMap[c],
        total: 0,
        percent: 0,
      }));
    return [...fromBudgets, ...extraExpenses];
  };
  const handleAddBudget = (e) => {
    e.preventDefault();
    if (!newBudget.category)
      return Swal.fire("Error", "Select a category", "error");
    if (!newBudget.month && newBudget.month !== 0)
      return Swal.fire("Error", "Select a month", "error");
    if (!newBudget.amount || Number(newBudget.amount) <= 0)
      return Swal.fire("Error", "Enter a valid amount", "error");
    const payload = {
      category: newBudget.category,
      amount: Number(newBudget.amount),
      month: Number(newBudget.month),
      email: user.email,
    };
    fetch("https://b12-a10-future-box-client-neon.vercel.app/budget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then(() => {
        Swal.fire("Added!", "Budget added successfully", "success");
        loadBudgets();
        setNewBudget({ category: "", amount: "", month: "" });
      });
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="w-20 h-20 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen px-4 pt-10 pb-20"
      style={{
        background:
          "linear-gradient(to bottom right, rgba(0,140,255,0.15), rgba(255,255,255,0.1))",
      }}
    >
      <h2 className="text-4xl font-extrabold text-center mb-8 text-primary drop-shadow-lg">
        Financial Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="p-4 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl">
          <label className="block text-sm mb-1">Charts month filter</label>
          <select
            className="select select-bordered w-full bg-white/40 backdrop-blur-lg"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

        <div className="p-4 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl">
          <label className="block text-sm mb-1">Budget month view</label>
          <select
            className="select select-bordered w-full bg-white/40 backdrop-blur-lg"
            value={budgetMonthView}
            onChange={(e) => setBudgetMonthView(e.target.value)}
          >
            <option value="">All Months</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
            <option value="0">All</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       
        <div className="rounded-3xl p-6 bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl">
          <h3 className="text-xl font-bold text-center mb-4">
            Income ({monthName(selectedMonth)})
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={incomePie} dataKey="value" outerRadius={100}>
                {incomePie.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-3xl p-6 bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl">
          <h3 className="text-xl font-bold text-center mb-4">
            Expenses ({monthName(selectedMonth)})
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={expensePie} dataKey="value" outerRadius={100}>
                {expensePie.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-3xl p-6 bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl">
          <h3 className="text-xl font-bold text-center mb-4">Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyIncomeExpense}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#3b82f6" />
              <Bar dataKey="expense" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-3xl font-bold mb-4 text-primary drop-shadow">Budgets</h3>

        <form
          onSubmit={handleAddBudget}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl"
        >
          <select
            className="select bg-white/40 backdrop-blur-lg"
            value={newBudget.category}
            onChange={(e) =>
              setNewBudget({ ...newBudget, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            {categories.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            className="select bg-white/40 backdrop-blur-lg"
            value={newBudget.month}
            onChange={(e) =>
              setNewBudget({ ...newBudget, month: e.target.value })
            }
          >
            <option value="">Month</option>
            <option value="0">All Months</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="input bg-white/40 backdrop-blur-lg"
            placeholder="Amount"
            value={newBudget.amount}
            onChange={(e) =>
              setNewBudget({ ...newBudget, amount: e.target.value })
            }
          />

          <button className="btn btn-primary bg-blue-600/80 backdrop-blur-lg border-none shadow-xl">
            Add
          </button>
        </form>

        <div className="mt-6 space-y-5">
          {monthlyMergedBudget(budgetMonthView || 0).map((b, i) => (
            <div
              key={i}
              className="p-4 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl"
            >
              <div className="flex justify-between text-sm font-semibold">
                <span>{b.name}</span>
                <span>
                  {b.used}/{b.total}
                </span>
              </div>

              <div className="w-full h-3 mt-2 bg-gray-300/30 rounded-full">
                <div
                  className={`h-3 rounded-full ${
                    b.total > 0
                      ? b.used > b.total
                        ? "bg-red-500"
                        : "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                  style={{
                    width: `${b.total ? Math.min(b.percent, 100) : 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <h3 className="text-3xl font-bold mb-6 text-primary drop-shadow">Savings</h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {savings.map((g, i) => {
            const percent = g.target ? (g.current / g.target) * 100 : 0;

            return (
              <div
                key={i}
                className=" rounded-3xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-xl text-center"
              >
                <div className="relative w-28 h-28 mx-auto">
                  <svg className="w-full h-full">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      stroke="orange"
                      strokeWidth="10"
                      fill="none"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      stroke="blue"
                      strokeWidth="10"
                      fill="none"
                      strokeDasharray={`${percent * 2.8} 360`}
                      strokeLinecap="round"
                    />
                  </svg>

                  <p className="absolute top-10 left-0 right-0 text-xl font-bold text-black drop-shadow">
                    {Math.round(percent)}%
                  </p>
                </div>

                <p className="mt-2 font-semibold">{g.name}</p>
                <p className="text-sm opacity-80">
                  {g.current}/{g.target}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Reports;
