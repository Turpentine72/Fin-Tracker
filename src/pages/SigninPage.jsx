import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

const SigninPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignin = (e) => {
    e.preventDefault();
    if (!name || !password) {
      alert("Name and password are required!");
      return;
    }
    const storedName = localStorage.getItem("userName");
    const storedPassword = localStorage.getItem("password");
    if (name === storedName && password === storedPassword) {
      alert("Sign in successful!");
      // Redirect to dashboard
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
        {/* Header with image and Expensely */}
        <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 relative">
          <img
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Expensely"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-between px-6">
            <h1 className="text-white text-3xl font-bold">Expensely</h1>
            <a href="/signup" className="text-white text-sm font-semibold hover:underline">
              Sign up
            </a>
          </div>
        </div>

        <div className="p-6">
          {/* Tagline */}
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Best way to save your money
          </p>

          {/* Sign in form */}
          <form onSubmit={handleSignin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 pl-10 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 pl-10 pr-16 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold text-base transition"
            >
              Sign in
            </button>
          </form>

      

          {/* Sign up link */}
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline font-semibold">
              SIGN UP
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;