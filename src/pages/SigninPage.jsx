import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import signinBg from "../assets/shubham-dhage-Vtm64FggqeQ-unsplash.jpg"; // Local image import

const SigninPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();
    if (!name || !password) {
      alert("Name and password are required!");
      return;
    }

    const storedName = localStorage.getItem("userName");
    const storedPassword = localStorage.getItem("userPassword");

    if (!storedName || !storedPassword) {
      alert("No user found. Please sign up first.");
      return;
    }

    if (name === storedName && password === storedPassword) {
      alert("Sign in successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
        {/* Header with local image */}
        <div className="h-40 relative">
          <img
            src={signinBg}
            alt="Fin Tracker"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-between px-6">
            <h1 className="text-white text-3xl font-bold">Fin Tracker</h1>
          </div>
        </div>

        <div className="p-6">
          <p className="text-center text-black text-xl dark:text-gray-400 mb-8">
            Sign In
          </p>

          <form onSubmit={handleSignin} className="space-y-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Name"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-12 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold text-base transition"
            >
              Sign in
            </button>
          </form>

          <p className="text-center text-black dark:text-gray-400 text-sm mt-4">
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