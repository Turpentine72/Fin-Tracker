import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Security = () => {
  const [form, setForm] = useState({
    currentUsername: "kelvin_dev",
    newUsername: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8 transition-colors">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Change Username Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800 dark:text-white">
            <FaUser className="text-indigo-600" /> Change Username
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                Current Username
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={form.currentUsername}
                  disabled
                  className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl pl-10 pr-4 py-3 dark:text-gray-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                New Username
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="newUsername"
                  value={form.newUsername}
                  onChange={handleChange}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter new username"
                />
              </div>
            </div>
          </div>

          <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2">
            Update Username
          </button>
        </div>

        {/* Change Password Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800 dark:text-white">
            <FaLock className="text-indigo-600" /> Change Password
          </h3>

          <div className="space-y-4">
            {/* Current Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showCurrent ? "text" : "password"}
                name="currentPassword"
                placeholder="Current Password"
                value={form.currentPassword}
                onChange={handleChange}
                className="w-full border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-12 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              >
                {showCurrent ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            {/* New Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-12 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              >
                {showNew ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            {/* Confirm New Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-12 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              >
                {showConfirm ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          <button className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Security;