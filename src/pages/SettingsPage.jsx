import React, { useState, useRef, useEffect } from "react";
import defaultAvatar from "../assets/mariia-shalabaieva-GSmXdBMjzcQ-unsplash.jpg";

const SettingsPage = () => {
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const fileInputRef = useRef();

  // Apply dark mode class to html element when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // CSV Export function
  const exportCSV = (data) => {
    if (!data || !data.length) return;

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(",")).join("\n");
    const csvContent = `${headers}\n${rows}`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!monthlyBudget || !username || !password) {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem("monthlyBudget", monthlyBudget);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("darkMode", darkMode);
    if (profilePic) localStorage.setItem("profilePic", profilePic);

    alert("Settings saved successfully!");
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Sample data to export
  const sampleData = [
    { Date: "2026-02-01", Description: "Food", Amount: 1200 },
    { Date: "2026-02-02", Description: "Transport", Amount: 800 },
    { Date: "2026-02-03", Description: "Salary", Amount: 5000 },
  ];

  return (
    <div className="min-h-screen bg-blue-200 dark:bg-gray-900 p-4 sm:p-8 flex justify-center items-start transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-sm sm:max-w-lg">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-900 dark:text-white">
          Settings
        </h1>

        <form onSubmit={handleSave}>
          {/* Clickable Profile Picture */}
          <div className="mb-6 flex flex-col items-center">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-2 bg-gray-300 dark:bg-gray-600 flex items-center justify-center cursor-pointer border overflow-hidden"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={profilePic || defaultAvatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleProfilePicChange}
              className="hidden"
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200 text-sm sm:text-base">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200 text-sm sm:text-base">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
            />
          </div>

          {/* Monthly Budget */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200 text-sm sm:text-base">
              Monthly Budget (₦)
            </label>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              placeholder="Enter your monthly budget"
              className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base appearance-none"
            />
          </div>

          {/* Dark Mode Toggle (only one) */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setDarkMode(!darkMode)}
            >
              <span className="text-gray-700 dark:text-gray-200 text-sm sm:text-base">
                Dark Mode
              </span>
              <div
                className={`w-12 h-6 rounded-full transition-colors ${
                  darkMode ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                } relative pointer-events-none`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow transform duration-300 absolute top-0.5 ${
                    darkMode ? "left-6" : "left-0.5"
                  }`}
                ></div>
              </div>
            </div>
          </div>

          {/* Buttons - no hover effect */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="submit"
              className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-600 text-white p-2 sm:p-3 rounded-lg text-sm sm:text-base transition-none"
            >
              Save Settings
            </button>
            <button
              type="button"
              onClick={() => exportCSV(sampleData)}
              className="w-full sm:flex-1 bg-green-600 hover:bg-green-600 text-white p-2 sm:p-3 rounded-lg text-sm sm:text-base transition-none"
            >
              Export CSV
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;