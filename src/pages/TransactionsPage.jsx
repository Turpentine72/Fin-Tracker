import React, { useState, useEffect } from "react";
import headerImage from "../assets/benjamin-dada-Pao6YVk4s7U-unsplash.jpg";
import { 
  FaWallet, FaMoneyBillWave, FaShoppingCart, FaPencilAlt, 
  FaTrash, FaCheck, FaTimes 
} from "react-icons/fa";

// Reusable SummaryCard (same as in Reports)
const SummaryCard = ({ icon, title, value, color, onEdit, editing, tempValue, setTempValue, onSave, onKeyDown }) => (
  <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4 relative">
    {onEdit && (
      <button
        onClick={onEdit}
        className="absolute top-2 right-2 text-gray-500 hover:text-blue-600"
      >
        <FaPencilAlt />
      </button>
    )}
    <div className={`text-3xl ${color}`}>{icon}</div>
    <div className="flex-1">
      <p className="text-gray-600 text-sm">{title}</p>
      {editing ? (
        <input
          type="number"
          value={tempValue}
          onChange={(e) => setTempValue(Number(e.target.value))}
          onBlur={onSave}
          onKeyDown={onKeyDown}
          className={`text-2xl font-bold mt-2 w-full border rounded px-2 py-1 ${color}`}
          autoFocus
        />
      ) : (
        <p className={`text-2xl font-bold mt-2 ${color}`}>{value}</p>
      )}
    </div>
  </div>
);

const TransactionsPage = () => {
  // Load transactions from localStorage or use defaults
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [
      { id: 1, description: "Food", amount: 1200, type: "expense" },
      { id: 2, description: "Salary", amount: 5000, type: "income" },
      { id: 3, description: "Transport", amount: 800, type: "expense" },
    ];
  });

  // Separate editable totals (like in Reports)
  const [totalIncome, setTotalIncome] = useState(() => 
    Number(localStorage.getItem("transactionsIncome")) || 5000
  );
  const [totalExpense, setTotalExpense] = useState(() => 
    Number(localStorage.getItem("transactionsExpense")) || 2000
  );

  // Edit mode flags for totals
  const [editingIncome, setEditingIncome] = useState(false);
  const [editingExpense, setEditingExpense] = useState(false);

  // Temporary values for editing totals
  const [tempIncome, setTempIncome] = useState(totalIncome);
  const [tempExpense, setTempExpense] = useState(totalExpense);

  // Form state for adding new transaction
  const [newDescription, setNewDescription] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newType, setNewType] = useState("expense");

  // Editing state for transaction rows
  const [editingId, setEditingId] = useState(null);
  const [editDescription, setEditDescription] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editType, setEditType] = useState("expense");

  // Persist transactions to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Persist editable totals
  useEffect(() => {
    localStorage.setItem("transactionsIncome", totalIncome);
  }, [totalIncome]);

  useEffect(() => {
    localStorage.setItem("transactionsExpense", totalExpense);
  }, [totalExpense]);

  // Balance is derived from editable totals (not from transactions)
  const balance = totalIncome - totalExpense;

  // Handlers for editing totals
  const handleSaveIncome = () => {
    setTotalIncome(tempIncome);
    setEditingIncome(false);
  };

  const handleSaveExpense = () => {
    setTotalExpense(tempExpense);
    setEditingExpense(false);
  };

  const handleKeyDown = (e, saveFunction) => {
    if (e.key === "Enter") saveFunction();
  };

  // Add new transaction
  const addTransaction = (e) => {
    e.preventDefault();
    if (!newDescription || !newAmount) return;

    const newTransaction = {
      id: Date.now(),
      description: newDescription,
      amount: parseFloat(newAmount) || 0,
      type: newType,
    };

    setTransactions([...transactions, newTransaction]);

    // Optionally update totals based on transaction (you could enable/disable this)
    // If you want totals to reflect transactions, uncomment these lines:
    // if (newType === "income") {
    //   setTotalIncome(prev => prev + newTransaction.amount);
    // } else {
    //   setTotalExpense(prev => prev + newTransaction.amount);
    // }

    setNewDescription("");
    setNewAmount("");
    setNewType("expense");
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      const deletedTransaction = transactions.find(t => t.id === id);
      setTransactions(transactions.filter(t => t.id !== id));

      // Optionally adjust totals (uncomment if needed)
      // if (deletedTransaction) {
      //   if (deletedTransaction.type === "income") {
      //     setTotalIncome(prev => prev - deletedTransaction.amount);
      //   } else {
      //     setTotalExpense(prev => prev - deletedTransaction.amount);
      //   }
      // }
    }
  };

  // Start editing transaction
  const startEdit = (transaction) => {
    setEditingId(transaction.id);
    setEditDescription(transaction.description);
    setEditAmount(transaction.amount);
    setEditType(transaction.type);
  };

  // Cancel editing transaction
  const cancelEdit = () => {
    setEditingId(null);
  };

  // Save edited transaction
  const saveEdit = (id) => {
    if (!editDescription || !editAmount) return;

    const oldTransaction = transactions.find(t => t.id === id);
    const updatedTransactions = transactions.map(t =>
      t.id === id
        ? { ...t, description: editDescription, amount: parseFloat(editAmount) || 0, type: editType }
        : t
    );
    setTransactions(updatedTransactions);

    // Optionally adjust totals (uncomment if needed)
    // if (oldTransaction) {
    //   // Remove old amount
    //   if (oldTransaction.type === "income") {
    //     setTotalIncome(prev => prev - oldTransaction.amount);
    //   } else {
    //     setTotalExpense(prev => prev - oldTransaction.amount);
    //   }
    //   // Add new amount
    //   if (editType === "income") {
    //     setTotalIncome(prev => prev + parseFloat(editAmount));
    //   } else {
    //     setTotalExpense(prev => prev + parseFloat(editAmount));
    //   }
    // }

    setEditingId(null);
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

      {/* Summary Cards - Now editable */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <SummaryCard
          icon={<FaMoneyBillWave />}
          title="Total Income"
          value={`₦${totalIncome.toLocaleString()}`}
          color="text-green-600"
          onEdit={() => {
            setEditingIncome(true);
            setTempIncome(totalIncome);
          }}
          editing={editingIncome}
          tempValue={tempIncome}
          setTempValue={setTempIncome}
          onSave={handleSaveIncome}
          onKeyDown={(e) => handleKeyDown(e, handleSaveIncome)}
        />

        <SummaryCard
          icon={<FaShoppingCart />}
          title="Total Expense"
          value={`₦${totalExpense.toLocaleString()}`}
          color="text-red-600"
          onEdit={() => {
            setEditingExpense(true);
            setTempExpense(totalExpense);
          }}
          editing={editingExpense}
          tempValue={tempExpense}
          setTempValue={setTempExpense}
          onSave={handleSaveExpense}
          onKeyDown={(e) => handleKeyDown(e, handleSaveExpense)}
        />

        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
          <div className="text-blue-600 text-3xl">
            <FaWallet />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Balance</p>
            <p className="text-2xl font-bold text-blue-600">
              ₦{balance.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Add Transaction Form */}
      <form onSubmit={addTransaction} className="mb-6 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg md:text-xl font-semibold mb-3">Add New Transaction</h2>

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
            className="border p-3 rounded w-full md:w-40 font-semibold"
          />

          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            className="border p-3 rounded bg-white font-semibold"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-3 rounded font-bold hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </form>

      {/* Transactions List */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow">
        <p className="text-lg md:text-xl font-semibold mb-3">Recent Transactions</p>

        {transactions.length === 0 && (
          <p className="text-gray-500 text-center py-4">No transactions yet.</p>
        )}

        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="border-b py-3 last:border-b-0"
          >
            {editingId === transaction.id ? (
              // Edit mode
              <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="border p-2 rounded flex-1 font-semibold"
                />
                <input
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  className="border p-2 rounded w-full md:w-32 font-semibold"
                />
                <select
                  value={editType}
                  onChange={(e) => setEditType(e.target.value)}
                  className="border p-2 rounded bg-white font-semibold"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(transaction.id)}
                    className="text-green-600 hover:text-green-800 p-2"
                    title="Save"
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="text-gray-600 hover:text-gray-800 p-2"
                    title="Cancel"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            ) : (
              // View mode
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <span className="font-semibold text-gray-800">
                    {transaction.description}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`font-bold text-lg ${
                      transaction.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}₦
                    {transaction.amount.toLocaleString()}
                  </span>
                  <button
                    onClick={() => startEdit(transaction)}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="Edit"
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsPage;