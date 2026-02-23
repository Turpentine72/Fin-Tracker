import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile menu button - visible only on small screens */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-20 md:hidden bg-gray-800 text-white p-2 rounded"
        aria-label="Toggle menu"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Overlay - closes sidebar when clicked (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform duration-300 ease-in-out
          w-64 bg-gray-800 text-white min-h-screen p-6
        `}
      >
        <h2 className="text-2xl font-bold mb-8">Fin Tracker</h2>

        <nav className="flex flex-col gap-4">
          <Link
            to="/dashboard"
            className="px-3 py-2 rounded text-xl"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/transactions"
            className="px-3 py-2 rounded text-xl"
            onClick={() => setIsOpen(false)}
          >
            Transactions
          </Link>
          <Link
            to="/reports"
            className="px-3 py-2 rounded text-xl"
            onClick={() => setIsOpen(false)}
          >
            Reports
          </Link>
          <Link
            to="/settings"
            className="px-3 py-2 rounded text-xl"
            onClick={() => setIsOpen(false)}
          >
            Settings
          </Link>

          
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;