import React from "react";
import { FaShoppingCart, FaMoneyBillWave, FaWallet } from "react-icons/fa";
import ReportsPieChart from "../components/ReportsPieChart";
import bannerImage from "../assets/giorgio-tomassetti-LtU_A0NHHtU-unsplash.jpg"; // your uploaded image

// Reusable Summary Card component
const SummaryCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded shadow flex items-center gap-4">
    <div className={`text-3xl ${color}`}>{icon}</div>
    <div>
      <h3 className="text-black text-base font-semibold">{title}</h3>
      <p className={`text-2xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
  </div>
);

const Reports = () => {
  return (
    <div className="flex flex-col min-h-screen bg-blue-500">
      <main className="flex-1 p-8">

        {/* Banner Section */}
        <div
          className="relative w-full h-48 rounded-lg overflow-hidden mb-8"
          style={{
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay for text */}
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Welcome, Damilare.
            </h2>
            <p className="text-white/90 text-base md:text-lg">
              Here's your financial overview.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            icon={<FaMoneyBillWave />}
            title="Total Income"
            value="₦50,000"
            color="text-green-600"
          />
          <SummaryCard
            icon={<FaShoppingCart />}
            title="Total Expenses"
            value="₦20,000"
            color="text-red-600"
          />
          <SummaryCard
            icon={<FaWallet />}
            title="Balance"
            value="₦30,000"
            color="text-blue-600"
          />
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <select className="p-2 rounded border border-gray-300 bg-white text-black text-base font-medium">
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
            <option>Custom Date</option>
          </select>
        </div>

        {/* Pie Chart Section */}
        <div className="bg-white p-4 rounded shadow h-64 w-full text-center">
          <h3 className="text-black font-semibold mb-2">Expense Distribution</h3>
          <ReportsPieChart />
        </div>

      </main>
    </div>
  );
};

export default Reports;