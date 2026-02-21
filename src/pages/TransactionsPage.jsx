import React, { useState } from "react";
import headerImage from "../assets/benjamin-dada-Pao6YVk4s7U-unsplash.jpg"; // add your uploaded image here

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Food", amount: 0 },
    { id: 2, description: "Salary", amount: 0 },
    { id: 3, description: "Transport", amount: 0 },
  ]);

  const [newDescription, setNewDescription] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const addTransaction = (e) => {
    e.preventDefault();
    if (!newDescription || !newAmount) return;

    const newTransaction = {
      id: Date.now(),
      description: newDescription,
      amount: parseFloat(newAmount) || 0,
    };

    setTransactions([...transactions, newTransaction]);
    setNewDescription("");
    setNewAmount("");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  return (
    <div className="p-4 md:p-6 bg-blue-500 min-h-screen">
      {/* Header Image Section */}
      <div className="relative rounded-xl overflow-hidden mb-6">
        <img
          src={headerImage}
          alt="Transactions Header"
          className="w-full h-52 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Welcome to Transactions
          </h1>
          <p className="text-white text-lg md:text-xl">
            Track and manage your financial activity
          </p>
        </div>
      </div>

      {/* Add Transaction Form */}
      <form onSubmit={addTransaction} className="mb-6 bg-white p-4 rounded-lg">
        <h2 className="text-lg md:text-xl font-semibold mb-3">
          Add New Transaction
        </h2>

        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="border p-3 rounded flex-1 font-semibold"
          />

          <input
            type="number"
            placeholder="Amount"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            className="border p-3 rounded w-full md:w-32 font-semibold"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-3 rounded font-bold hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </form>

      {/* Transactions List */}
      <div className="bg-white p-4 md:p-6 rounded-xl">
        <p className="text-lg md:text-xl font-semibold mb-3">Recent Transactions</p>

        {transactions.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No transactions yet.
          </p>
        )}

        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center border-b py-3 last:border-b-0"
          >
            <span className="font-semibold text-gray-800 mb-1 md:mb-0">
              {transaction.description}
            </span>

            <div className="flex items-center gap-4">
              <span className="font-bold text-lg md:text-xl text-gray-900">
                ₦{transaction.amount.toFixed(2)}
              </span>

              <button
                onClick={() => deleteTransaction(transaction.id)}
                className="text-red-600 font-bold text-2xl hover:text-red-800 transition"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsPage;