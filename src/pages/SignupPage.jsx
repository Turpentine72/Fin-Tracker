import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.username || !formData.password) {
      alert("Please fill in all required fields");
      return;
    }

    console.log("Signup data:", formData);

    // Optional: Save to localStorage
    localStorage.setItem("username", formData.username);
    localStorage.setItem("password", formData.password);

    navigate("/login");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600 px-4 py-6 sm:px-6">
      <div className="bg-white p-6 sm:p-8 rounded shadow-md w-full max-w-sm sm:max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-black">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-black text-sm sm:text-base">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border px-3 py-2 rounded text-sm sm:text-base"
            />
          </div>

          {/* Username Field */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-black text-sm sm:text-base">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full border px-3 py-2 rounded text-sm sm:text-base"
            />
          </div>

          {/* Password Field with Toggle */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-black text-sm sm:text-base">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border px-3 py-2 rounded text-sm sm:text-base pr-10"
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
            className="w-full bg-blue-600 text-white py-2 px-4 rounded text-sm sm:text-base"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm sm:text-base text-black">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;