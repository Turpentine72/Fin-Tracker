import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import heroImage from "../assets/kelly-sikkema-wdnpaTNwOEQ-unsplash.jpg";
import analyticsImage from "../assets/2h-media-dbZkCU0SLPE-unsplash.jpg";
import trackingImage from "../assets/jess-bailey-iMjLgjFms7E-unsplash.jpg";
import reportsImage from "../assets/photo-1556740738-b6a63e27c4df.jfif";
import aboutImage from "../assets/ze-vieira-sr927_EVdqk-unsplash.jpg";

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate("/login");
    setMenuOpen(false); // close menu after navigation
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-700 sticky top-0 z-10">
        <div className="flex justify-between items-center px-4 sm:px-8 py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Fin Tracker
          </h1>

          {/* Desktop Menu (hidden on mobile) */}
          <div className="hidden sm:flex gap-6 items-center">
            <a href="#features" className="text-white text-xl">
              Features
            </a>
            <button
              onClick={handleDashboardClick}
              className="text-white text-xl"
            >
              Dashboard
            </button>
            <Link
              to="/signup"
              className="bg-white text-blue-700 px-4 py-2 rounded text-lg whitespace-nowrap"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-white text-2xl focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="sm:hidden flex flex-col items-center gap-4 pb-6 bg-blue-700">
            <a
              href="#features"
              className="text-white text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Features
            </a>
            <button
              onClick={handleDashboardClick}
              className="text-white text-lg"
            >
              Dashboard
            </button>
            <Link
              to="/signup"
              className="bg-white text-blue-700 px-4 py-2 rounded text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-center items-center px-4 sm:px-10 py-16 sm:py-24 bg-blue-500 gap-8 sm:gap-12">
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
            Take Control of Your Money
          </h1>
          <p className="text-white mb-6 sm:mb-8 text-base sm:text-lg">
            Track income, monitor expenses, and visualize your spending in real-time.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
            <button
              onClick={handleDashboardClick}
              className="bg-white text-blue-700 px-5 py-2.5 sm:px-6 sm:py-3 rounded text-sm sm:text-base"
            >
              Go to Dashboard
            </button>

            <Link
              to="/signup"
              className="bg-white text-blue-700 px-5 py-2.5 sm:px-6 sm:py-3 rounded text-sm sm:text-base"
            >
              Create Free Account
            </Link>
          </div>
        </div>

        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
          <img
            src={heroImage}
            alt="Finance Dashboard"
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 px-4 sm:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-blue-700">
            Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
            <div className="bg-blue-600 p-6 sm:p-8 rounded text-center flex flex-col">
              <img
                src={analyticsImage}
                alt="Analytics"
                className="w-full h-40 sm:h-48 object-cover rounded mb-4 sm:mb-6"
              />
              <h3 className="font-bold text-xl sm:text-2xl mb-2 sm:mb-3 text-white">
                Real-Time Analytics
              </h3>
              <p className="text-white text-sm sm:text-base">
                See where your money goes instantly with smart charts.
              </p>
            </div>

            <div className="bg-blue-600 p-6 sm:p-8 rounded text-center flex flex-col">
              <img
                src={trackingImage}
                alt="Tracking"
                className="w-full h-40 sm:h-48 object-cover rounded mb-4 sm:mb-6"
              />
              <h3 className="font-bold text-xl sm:text-2xl mb-2 sm:mb-3 text-white">
                Expense Tracking
              </h3>
              <p className="text-white text-sm sm:text-base">
                Log and categorize your spending easily.
              </p>
            </div>

            <div className="bg-blue-600 p-6 sm:p-8 rounded text-center flex flex-col">
              <img
                src={reportsImage}
                alt="Reports"
                className="w-full h-40 sm:h-48 object-cover rounded mb-4 sm:mb-6"
              />
              <h3 className="font-bold text-xl sm:text-2xl mb-2 sm:mb-3 text-white">
                Monthly Reports
              </h3>
              <p className="text-white text-sm sm:text-base">
                Understand your financial habits better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-10 bg-blue-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 sm:gap-12">
          <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
            <img
              src={aboutImage}
              alt="Financial Planning"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>

          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-4 sm:mb-6">
              Why Choose Fin Tracker?
            </h2>
            <p className="text-blue-900 text-base sm:text-lg mb-4 sm:mb-6">
              Fin Tracker helps individuals and businesses manage their finances
              effectively with powerful tools and simple design.
            </p>
            <p className="text-blue-900 text-base sm:text-lg">
              From tracking expenses to generating monthly reports, everything is
              built to help you stay financially disciplined and grow your savings.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-700 text-white text-center py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
            Ready to Master Your Finances?
          </h2>

          <Link
            to="/signup"
            className="inline-block bg-white text-blue-700 px-6 sm:px-8 py-3 sm:py-4 rounded font-medium text-base sm:text-lg"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 sm:py-8 text-blue-700 bg-white text-base sm:text-xl font-semibold">
        <div className="max-w-7xl mx-auto">
          © 2026 SmartTrack. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;