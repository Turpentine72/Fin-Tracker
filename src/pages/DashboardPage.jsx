import React from "react";
import heroImage from "../assets/shubham-dhage-Vtm64FggqeQ-unsplash.jpg";
import { FaWallet, FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";

const DashboardPage = () => {
  return (
    <div className="p-6">
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
            Welcome, Damilare. 
          </h1>
          <p className="text-white md:text-lg mt-1">
            Here’s your financial overview.
          </p>
        </div>
      </div>

      {/* Financial Cards */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mt-6">
        {/* Total Income */}
        <div className="bg-white rounded-md flex-1 p-6 flex items-center shadow-md min-w-[200px]">
          <div className="text-green-600 text-3xl mr-4">
            <FaMoneyBillWave />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Total Income</h3>
            <p className="text-xl md:text-3xl font-bold text-green-600 mt-1">
              ₦50,000
            </p>
          </div>
        </div>

        {/* Total Expense */}
        <div className="bg-white rounded-md flex-1 p-6 flex items-center shadow-md min-w-[200px]">
          <div className="text-red-600 text-3xl mr-4">
            <FaShoppingCart />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Total Expense</h3>
            <p className="text-xl md:text-3xl font-bold text-red-600 mt-1">
              ₦20,000
            </p>
          </div>
        </div>

        {/* Balance */}
        <div className="bg-white rounded-md flex-1 p-6 flex items-center shadow-md min-w-[200px]">
          <div className="text-blue-600 text-3xl mr-4">
            <FaWallet />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Balance</h3>
            <p className="text-xl md:text-3xl font-bold mt-1">₦30,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;