import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaMoneyBillWave, FaWallet, FaPencilAlt } from "react-icons/fa";
import ReportsPieChart from "../components/ReportsPieChart";
import bannerImage from "../assets/giorgio-tomassetti-LtU_A0NHHtU-unsplash.jpg";

// SummaryCard component (copied from previous version and made responsive)
const SummaryCard = ({ icon, title, value, color, onEdit, editing, tempValue, setTempValue, onSave, onKeyDown }) => (
  <div className="bg-white p-4 sm:p-6 rounded shadow flex items-center gap-4 relative">
    {onEdit && (
      <button
        onClick={onEdit}
        className="absolute top-2 right-2 text-gray-500 hover:text-blue-600"
      >
        <FaPencilAlt />
      </button>
    )}
    <div className={`text-2xl sm:text-3xl ${color}`}>{icon}</div>
    <div className="flex-1">
      <h3 className="text-black text-sm sm:text-base font-semibold">{title}</h3>
      {editing ? (
        <input
          type="number"
          value={tempValue}
          onChange={(e) => setTempValue(Number(e.target.value))}
          onBlur={onSave}
          onKeyDown={onKeyDown}
          className={`text-xl sm:text-2xl font-bold mt-2 w-full border rounded px-2 py-1 ${color}`}
          autoFocus
        />
      ) : (
        <p className={`text-xl sm:text-2xl font-bold mt-2 ${color}`}>{value}</p>
      )}
    </div>
  </div>
);

// Initial pie data as requested
const initialPieData = [
  { name: "Salary", value: 5000 },
  { name: "Transport", value: 800 },
  { name: "Food", value: 1200 },
];

const Reports = () => {
  // State for editable values
  const [totalIncome, setTotalIncome] = useState(() => 
    Number(localStorage.getItem("reportsIncome")) || 50000
  );
  const [totalExpense, setTotalExpense] = useState(() => 
    Number(localStorage.getItem("reportsExpense")) || 20000
  );
  const [monthlyBudget, setMonthlyBudget] = useState(() => 
    Number(localStorage.getItem("reportsBudget")) || 0
  );

  // Edit mode flags
  const [editingIncome, setEditingIncome] = useState(false);
  const [editingExpense, setEditingExpense] = useState(false);
  const [editingBudget, setEditingBudget] = useState(false);

  // Temporary values during editing
  const [tempIncome, setTempIncome] = useState(totalIncome);
  const [tempExpense, setTempExpense] = useState(totalExpense);
  const [tempBudget, setTempBudget] = useState(monthlyBudget);

  // Pie chart data state (can be extended to be editable if needed)
  const [pieData, setPieData] = useState(initialPieData);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("reportsIncome", totalIncome);
  }, [totalIncome]);

  useEffect(() => {
    localStorage.setItem("reportsExpense", totalExpense);
  }, [totalExpense]);

  useEffect(() => {
    localStorage.setItem("reportsBudget", monthlyBudget);
  }, [monthlyBudget]);

  const balance = totalIncome - totalExpense;
  const budgetUsedPercentage = monthlyBudget > 0 ? (totalExpense / monthlyBudget) * 100 : 0;

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

  const handleKeyDown = (e, saveFunction) => {
    if (e.key === "Enter") {
      saveFunction();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-500">
      <main className="flex-1 p-4 sm:p-8">

        {/* Banner */}
        <div
          className="relative w-full h-36 sm:h-48 rounded-lg overflow-hidden mb-6 sm:mb-8"
          style={{
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-4 sm:px-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Welcome, Damilare.
            </h2>
            <p className="text-white/90 text-sm sm:text-base md:text-lg">
              Here's your financial overview.
            </p>
          </div>
        </div>

        {/* Summary Cards - Editable */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
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
            title="Total Expenses"
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
          <SummaryCard
            icon={<FaWallet />}
            title="Balance"
            value={`₦${balance.toLocaleString()}`}
            color="text-blue-600"
            // Balance is not editable directly
          />
        </div>

        {/* Budget Progress with Edit */}
        <div className="bg-white rounded-md shadow-md p-4 sm:p-6 mb-6 sm:mb-8 relative">
          <button
            onClick={() => {
              setEditingBudget(true);
              setTempBudget(monthlyBudget);
            }}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-blue-600"
          >
            <FaPencilAlt />
          </button>
          <h3 className="text-base sm:text-lg font-semibold mb-3">
            Monthly Budget:{" "}
            {editingBudget ? (
              <input
                type="number"
                value={tempBudget}
                onChange={(e) => setTempBudget(Number(e.target.value))}
                onBlur={handleSaveBudget}
                onKeyDown={(e) => handleKeyDown(e, handleSaveBudget)}
                className="text-base sm:text-lg font-semibold border rounded px-2 py-1 w-28 sm:w-32"
                autoFocus
              />
            ) : (
              `₦${monthlyBudget.toLocaleString()}`
            )}
          </h3>
          <div className="w-full bg-gray-300 h-3 sm:h-4 rounded-full">
            <div
              className="bg-blue-600 h-3 sm:h-4 rounded-full"
              style={{ width: `${budgetUsedPercentage}%` }}
            ></div>
          </div>
          <p className="mt-2 text-xs sm:text-sm">
            {budgetUsedPercentage.toFixed(1)}% of budget used
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="mb-6 sm:mb-8">
          <select className="p-2 rounded border border-gray-300 bg-white text-black text-sm sm:text-base font-medium">
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
            <option>Custom Date</option>
          </select>
        </div>

        {/* Pie Chart - now using the dynamic pieData */}
        <div className="bg-white p-4 rounded shadow h-80 sm:h-96 w-full flex flex-col">
          <h3 className="text-black font-semibold mb-2 text-center text-sm sm:text-base">
            Expense Distribution
          </h3>
          <div className="flex-1 flex items-center justify-center">
            <ReportsPieChart data={pieData} />
          </div>
        </div>

      </main>
    </div>
  );
};

export default Reports;