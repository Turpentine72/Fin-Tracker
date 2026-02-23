import React from "react";
import heroImage from "../assets/shubham-dhage-Vtm64FggqeQ-unsplash.jpg";
import { FaWallet, FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";

const DashboardPage = () => {
  const username = localStorage.getItem("username") || "User";

  const totalIncome = 50000;
  const totalExpense = 20000;
  const balance = totalIncome - totalExpense;

  const recentTransactions = [
    { id: 1, title: "Food", amount: -1200 },
    { id: 2, title: "Transport", amount: -800 },
    { id: 3, title: "Salary", amount: 5000 },
  ];

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
        {/* Income */}
        <div className="bg-white rounded-md flex-1 p-6 flex items-center shadow-md">
          <div className="text-green-600 text-3xl mr-4">
            <FaMoneyBillWave />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Total Income</h3>
            <p className="text-2xl md:text-3xl font-bold text-green-600 mt-1">
              ₦{totalIncome.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Expense */}
        <div className="bg-white rounded-md flex-1 p-6 flex items-center shadow-md">
          <div className="text-red-600 text-3xl mr-4">
            <FaShoppingCart />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Total Expense</h3>
            <p className="text-2xl md:text-3xl font-bold text-red-600 mt-1">
              ₦{totalExpense.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Balance */}
        <div className="bg-white rounded-md flex-1 p-6 flex items-center shadow-md">
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

      {/* Recent Transactions */}
      <div className="bg-white rounded-md shadow-md p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">
          Recent Transactions
        </h3>

        {recentTransactions.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b py-2"
          >
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