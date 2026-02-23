import React, { useState, useEffect } from "react";
import heroImage from "../assets/shubham-dhage-Vtm64FggqeQ-unsplash.jpg";
import { FaWallet, FaMoneyBillWave, FaShoppingCart, FaPencilAlt } from "react-icons/fa";

const DashboardPage = () => {
  const username = localStorage.getItem("username") || "User";

  // State for editable values
  const [totalIncome, setTotalIncome] = useState(() => 
    Number(localStorage.getItem("totalIncome")) || 50000
  );
  const [totalExpense, setTotalExpense] = useState(() => 
    Number(localStorage.getItem("totalExpense")) || 20000
  );
  const [monthlyBudget, setMonthlyBudget] = useState(() => 
    Number(localStorage.getItem("monthlyBudget")) || 0
  );

  // Edit mode flags
  const [editingIncome, setEditingIncome] = useState(false);
  const [editingExpense, setEditingExpense] = useState(false);
  const [editingBudget, setEditingBudget] = useState(false);

  // Temporary input values during editing
  const [tempIncome, setTempIncome] = useState(totalIncome);
  const [tempExpense, setTempExpense] = useState(totalExpense);
  const [tempBudget, setTempBudget] = useState(monthlyBudget);

  // Persist to localStorage when values change
  useEffect(() => {
    localStorage.setItem("totalIncome", totalIncome);
  }, [totalIncome]);

  useEffect(() => {
    localStorage.setItem("totalExpense", totalExpense);
  }, [totalExpense]);

  useEffect(() => {
    localStorage.setItem("monthlyBudget", monthlyBudget);
  }, [monthlyBudget]);

  const balance = totalIncome - totalExpense;
  const budgetUsedPercentage =
    monthlyBudget > 0 ? (totalExpense / monthlyBudget) * 100 : 0;

  const recentTransactions = [
    { id: 1, title: "Food", amount: -1200 },
    { id: 2, title: "Transport", amount: -800 },
    { id: 3, title: "Salary", amount: +5000 },
  ];

  // Handlers for saving edits
  const handleSaveIncome = () => {
    setTotalIncome(tempIncome);
    setEditingIncome(false);
  };

  const handleSaveExpense = () => {
    setTotalExpense(tempExpense);
    setEditingExpense(false);
  };

  const handleSaveBudget = () => {
    setMonthlyBudget(tempBudget);
    setEditingBudget(false);
  };

  // Key press handler to save on Enter
  const handleKeyDown = (e, saveFunction) => {
    if (e.key === "Enter") {
      saveFunction();
    }
  };

  return (
    <div className="p-6 bg-blue-500 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative rounded-lg overflow-hidden h-72 flex flex-col justify-center p-6"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black bg-opacity-40 p-4 rounded">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Welcome, {username}.
          </h1>
          <p className="text-white md:text-lg mt-1">
            Here’s your financial overview.
          </p>
        </div>
      </div>

      {/* Financial Cards */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mt-6">
        {/* Income Card */}
        <div className="bg-white rounded-md flex-1 p-6 shadow-md relative">
          <button
            onClick={() => {
              setEditingIncome(true);
              setTempIncome(totalIncome);
            }}
            className="absolute top-2 right-2 text-gray-500 hover:text-blue-600"
          >
            <FaPencilAlt />
          </button>
          <div className="flex items-center">
            <div className="text-green-600 text-3xl mr-4">
              <FaMoneyBillWave />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Total Income</h3>
              {editingIncome ? (
                <input
                  type="number"
                  value={tempIncome}
                  onChange={(e) => setTempIncome(Number(e.target.value))}
                  onBlur={handleSaveIncome}
                  onKeyDown={(e) => handleKeyDown(e, handleSaveIncome)}
                  className="text-2xl md:text-3xl font-bold text-green-600 mt-1 w-full border rounded px-2 py-1"
                  autoFocus
                />
              ) : (
                <p className="text-2xl md:text-3xl font-bold text-green-600 mt-1">
                  ₦{totalIncome.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Expense Card */}
        <div className="bg-white rounded-md flex-1 p-6 shadow-md relative">
          <button
            onClick={() => {
              setEditingExpense(true);
              setTempExpense(totalExpense);
            }}
            className="absolute top-2 right-2 text-gray-500 hover:text-blue-600"
          >
            <FaPencilAlt />
          </button>
          <div className="flex items-center">
            <div className="text-red-600 text-3xl mr-4">
              <FaShoppingCart />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Total Expense</h3>
              {editingExpense ? (
                <input
                  type="number"
                  value={tempExpense}
                  onChange={(e) => setTempExpense(Number(e.target.value))}
                  onBlur={handleSaveExpense}
                  onKeyDown={(e) => handleKeyDown(e, handleSaveExpense)}
                  className="text-2xl md:text-3xl font-bold text-red-600 mt-1 w-full border rounded px-2 py-1"
                  autoFocus
                />
              ) : (
                <p className="text-2xl md:text-3xl font-bold text-red-600 mt-1">
                  ₦{totalExpense.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-white rounded-md flex-1 p-6 shadow-md">
          <div className="flex items-center">
            <div className="text-blue-600 text-3xl mr-4">
              <FaWallet />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Balance</h3>
              <p className="text-2xl md:text-3xl font-bold mt-1">
                ₦{balance.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Progress with Edit */}
      <div className="bg-white rounded-md shadow-md p-6 mt-6 relative">
        <button
          onClick={() => {
            setEditingBudget(true);
            setTempBudget(monthlyBudget);
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-blue-600"
        >
          <FaPencilAlt />
        </button>
        <h3 className="text-lg font-semibold mb-3">
          Monthly Budget:{" "}
          {editingBudget ? (
            <input
              type="number"
              value={tempBudget}
              onChange={(e) => setTempBudget(Number(e.target.value))}
              onBlur={handleSaveBudget}
              onKeyDown={(e) => handleKeyDown(e, handleSaveBudget)}
              className="text-lg font-semibold border rounded px-2 py-1 w-32"
              autoFocus
            />
          ) : (
            `₦${monthlyBudget.toLocaleString()}`
          )}
        </h3>

        <div className="w-full bg-gray-300 h-4 rounded-full">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${budgetUsedPercentage}%` }}
          ></div>
        </div>

        <p className="mt-2 text-sm">
          {budgetUsedPercentage.toFixed(1)}% of budget used
        </p>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-md shadow-md p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        {recentTransactions.map((item) => (
          <div key={item.id} className="flex justify-between border-b py-2">
            <span>{item.title}</span>
            <span
              className={`font-semibold ${
                item.amount > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              ₦{Math.abs(item.amount).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;