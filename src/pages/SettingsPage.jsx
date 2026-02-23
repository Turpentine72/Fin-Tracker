import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/mariia-shalabaieva-GSmXdBMjzcQ-unsplash.jpg";

const SettingsPage = () => {
  const navigate = useNavigate();

  const [monthlyBudget, setMonthlyBudget] = useState(
    localStorage.getItem("monthlyBudget") || ""
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [password, setPassword] = useState(
    localStorage.getItem("password") || ""
  );
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profilePic") || null
  );
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const fileInputRef = useRef();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const exportCSV = (data) => {
    if (!data || !data.length) return;

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(",")).join("\n");
    const csvContent = `${headers}\n${rows}`;

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sampleData = [
    { Date: "2026-02-01", Description: "Food", Amount: 1200 },
    { Date: "2026-02-02", Description: "Transport", Amount: 800 },
    { Date: "2026-02-03", Description: "Salary", Amount: 5000 },
  ];

  return (
    <div className="min-h-screen bg-blue-500 dark:bg-gray-900 p-6 flex justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Settings
        </h1>

        <form onSubmit={handleSave}>
          {/* Profile Picture */}
          <div className="mb-6 flex flex-col items-center">
            <div
              className="w-24 h-24 rounded-full mb-2 bg-gray-300 dark:bg-gray-600 flex items-center justify-center cursor-pointer border overflow-hidden"
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
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Monthly Budget */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
              Monthly Budget (₦)
            </label>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              placeholder="Enter your monthly budget"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Dark Mode */}
          <div
            className="flex items-center justify-between mb-6 cursor-pointer"
            onClick={() => {
              setDarkMode(!darkMode);
              localStorage.setItem("darkMode", !darkMode);
            }}
          >
            <span className="text-gray-700 dark:text-gray-200">
              Dark Mode
            </span>
            <div
              className={`w-12 h-6 rounded-full ${
                darkMode ? "bg-blue-600" : "bg-gray-300"
              } relative`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full absolute top-0.5 ${
                  darkMode ? "left-6" : "left-0.5"
                }`}
              ></div>
            </div>
          </div>

          {/* Buttons Row */}
          <div className="flex gap-3 mb-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white p-3 rounded-lg"
            >
              Save Settings
            </button>

            <button
              type="button"
              onClick={() => exportCSV(sampleData)}
              className="flex-1 bg-green-600 text-white p-3 rounded-lg"
            >
              Export CSV
            </button>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full bg-red-500 text-white p-3 rounded-lg"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;