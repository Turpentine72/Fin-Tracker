import React, { useState, useEffect } from "react";
import { 
  FaUser, FaWallet, FaPalette, FaSave, FaUndo, 
  FaEye, FaEyeSlash, FaCamera, FaSignOutAlt 
} from "react-icons/fa";

const SettingsPage = () => {
  // Load settings from localStorage or defaults
  const [name, setName] = useState(localStorage.getItem("userName") || "");
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [password, setPassword] = useState(localStorage.getItem("password") || "");
  const [monthlyBudget, setMonthlyBudget] = useState(
    Number(localStorage.getItem("monthlyBudget")) || 0
  );
  const [currency, setCurrency] = useState(localStorage.getItem("currency") || "₦");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [dateFormat, setDateFormat] = useState(localStorage.getItem("dateFormat") || "MM/DD/YYYY");
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || "");

  // Password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Active tab
  const [activeTab, setActiveTab] = useState("profile");

  // Temporary state for unsaved changes
  const [tempName, setTempName] = useState(name);
  const [tempUsername, setTempUsername] = useState(username);
  const [tempPassword, setTempPassword] = useState(password);
  const [tempBudget, setTempBudget] = useState(monthlyBudget);
  const [tempCurrency, setTempCurrency] = useState(currency);
  const [tempTheme, setTempTheme] = useState(theme);
  const [tempDateFormat, setTempDateFormat] = useState(dateFormat);
  const [tempProfilePic, setTempProfilePic] = useState(profilePic);

  // Save profile changes (including profile pic)
  const saveProfile = () => {
    if (!tempName || !tempUsername || !tempPassword) {
      alert("All fields are required.");
      return;
    }
    setName(tempName);
    setUsername(tempUsername);
    setPassword(tempPassword);
    setProfilePic(tempProfilePic);
    localStorage.setItem("userName", tempName);
    localStorage.setItem("username", tempUsername);
    localStorage.setItem("password", tempPassword);
    localStorage.setItem("profilePic", tempProfilePic);
    alert("Profile updated successfully!");
  };

  // Save budget
  const saveBudget = () => {
    setMonthlyBudget(tempBudget);
    localStorage.setItem("monthlyBudget", tempBudget);
    alert("Budget updated successfully!");
  };

  // Save preferences
  const savePreferences = () => {
    setCurrency(tempCurrency);
    setTheme(tempTheme);
    setDateFormat(tempDateFormat);
    localStorage.setItem("currency", tempCurrency);
    localStorage.setItem("theme", tempTheme);
    localStorage.setItem("dateFormat", tempDateFormat);

    // Apply theme
    if (tempTheme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    alert("Preferences updated successfully!");
  };

  // Reset profile to saved values
  const resetProfile = () => {
    setTempName(name);
    setTempUsername(username);
    setTempPassword(password);
    setTempProfilePic(profilePic);
  };

  // Reset budget to saved
  const resetBudget = () => {
    setTempBudget(monthlyBudget);
  };

  // Reset preferences to saved
  const resetPreferences = () => {
    setTempCurrency(currency);
    setTempTheme(theme);
    setTempDateFormat(dateFormat);
  };

  // Handle profile picture upload (simulated with file reader)
  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/"; // Change to your login route
  };

  // Apply theme on mount and when theme changes
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-blue-500 dark:bg-gray-900 p-4 sm:p-6 transition-colors">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors">
        {/* Header */}
        <div className="bg-blue-600 dark:bg-blue-800 text-white p-4 sm:p-6 transition-colors">
          <h1 className="text-xl sm:text-2xl font-bold">Settings</h1>
          <p className="text-sm sm:text-base text-blue-100 dark:text-blue-200">
            Manage your account and preferences
          </p>
        </div>

        {/* Tabs - responsive wrap */}
        <div className="flex flex-wrap border-b dark:border-gray-700">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 min-w-[120px] py-3 font-semibold transition ${
              activeTab === "profile"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            <FaUser className="inline mr-2" /> Profile
          </button>
          <button
            onClick={() => setActiveTab("budget")}
            className={`flex-1 min-w-[120px] py-3 font-semibold transition ${
              activeTab === "budget"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            <FaWallet className="inline mr-2" /> Budget
          </button>
          <button
            onClick={() => setActiveTab("preferences")}
            className={`flex-1 min-w-[120px] py-3 font-semibold transition ${
              activeTab === "preferences"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            <FaPalette className="inline mr-2" /> Preferences
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* Profile Picture Section - stacks on mobile */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden flex items-center justify-center">
                    {tempProfilePic ? (
                      <img src={tempProfilePic} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <FaUser className="text-3xl sm:text-4xl text-gray-600 dark:text-gray-400" />
                    )}
                  </div>
                  <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-blue-600 dark:bg-blue-700 text-white p-1.5 sm:p-2 rounded-full cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-800 transition">
                    <FaCamera className="text-sm sm:text-base" />
                  </label>
                  <input
                    type="file"
                    id="profile-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePicUpload}
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">Profile Picture</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Click the camera icon to upload</p>
                </div>
              </div>

              {/* Profile Fields */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1 text-sm sm:text-base">
                  Name
                </label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm sm:text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1 text-sm sm:text-base">
                  Username
                </label>
                <input
                  type="text"
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm sm:text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1 text-sm sm:text-base">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={tempPassword}
                    onChange={(e) => setTempPassword(e.target.value)}
                    className="w-full border rounded px-3 py-2 pr-10 text-sm sm:text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 dark:text-gray-400"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Action Buttons - stack on mobile */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  onClick={saveProfile}
                  className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-700 dark:hover:bg-blue-800 transition text-sm sm:text-base"
                >
                  <FaSave /> Save Profile
                </button>
                <button
                  onClick={resetProfile}
                  className="bg-gray-500 dark:bg-gray-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-600 dark:hover:bg-gray-700 transition text-sm sm:text-base"
                >
                  <FaUndo /> Reset
                </button>
              </div>

              {/* Logout Button */}
              <div className="border-t dark:border-gray-700 pt-6">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 dark:bg-red-700 text-white px-4 py-3 rounded flex items-center justify-center gap-2 hover:bg-red-700 dark:hover:bg-red-800 transition font-semibold text-sm sm:text-base"
                >
                  <FaSignOutAlt /> Logout
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                  This will clear all your local data and log you out.
                </p>
              </div>
            </div>
          )}

          {/* Budget Tab */}
          {activeTab === "budget" && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1 text-sm sm:text-base">
                  Monthly Budget ({currency})
                </label>
                <input
                  type="number"
                  value={tempBudget}
                  onChange={(e) => setTempBudget(Number(e.target.value))}
                  className="w-full border rounded px-3 py-2 text-sm sm:text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  placeholder="0"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  onClick={saveBudget}
                  className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-700 dark:hover:bg-blue-800 transition text-sm sm:text-base"
                >
                  <FaSave /> Save Budget
                </button>
                <button
                  onClick={resetBudget}
                  className="bg-gray-500 dark:bg-gray-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-600 dark:hover:bg-gray-700 transition text-sm sm:text-base"
                >
                  <FaUndo /> Reset
                </button>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1 text-sm sm:text-base">
                  Currency Symbol
                </label>
                <select
                  value={tempCurrency}
                  onChange={(e) => setTempCurrency(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm sm:text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                >
                  <option value="₦">₦ Naira</option>
                  <option value="$">$ Dollar</option>
                  <option value="€">€ Euro</option>
                  <option value="£">£ Pound</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1 text-sm sm:text-base">
                  Theme
                </label>
                <select
                  value={tempTheme}
                  onChange={(e) => setTempTheme(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm sm:text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1 text-sm sm:text-base">
                  Date Format
                </label>
                <select
                  value={tempDateFormat}
                  onChange={(e) => setTempDateFormat(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm sm:text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  onClick={savePreferences}
                  className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-700 dark:hover:bg-blue-800 transition text-sm sm:text-base"
                >
                  <FaSave /> Save Preferences
                </button>
                <button
                  onClick={resetPreferences}
                  className="bg-gray-500 dark:bg-gray-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-600 dark:hover:bg-gray-700 transition text-sm sm:text-base"
                >
                  <FaUndo /> Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;