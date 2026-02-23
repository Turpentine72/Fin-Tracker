import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../utils/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    // Get saved credentials from localStorage
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (username !== savedUsername || password !== savedPassword) {
      alert("Invalid username or password");
      return;
    }

    // Save fake token
    login("my-secret-token");

    navigate("/dashboard");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 px-4 py-6 sm:px-6">
      <div className="bg-white p-6 sm:p-8 rounded shadow-md w-full max-w-sm sm:max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-black">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block mb-1 text-black text-sm sm:text-base">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border px-3 py-2 rounded text-sm sm:text-base"
              placeholder="Enter your username"
            />
          </div>

          {/* Password with Toggle */}
          <div>
            <label className="block mb-1 text-black text-sm sm:text-base">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded text-sm sm:text-base pr-10"
                placeholder="********"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded text-sm sm:text-base"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm sm:text-base text-black">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;