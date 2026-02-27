import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages (eager load for better UX)
import LandingPage from "./pages/LandingPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";

// Protected Pages (lazy load for code splitting)
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const TransactionsPage = lazy(() => import("./pages/TransactionsPage"));
const Account = lazy(() => import("./pages/Account"));
const Security = lazy(() => import("./pages/Security"));

// Layout wrapper with Suspense for lazy routes
function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          {children}
        </Suspense>
      </div>
    </div>
  );
}

// Protected route wrapper with layout
const ProtectedRouteWithLayout = ({ element: Component }) => (
  <ProtectedRoute>
    <AppLayout>
      <Component />
    </AppLayout>
  </ProtectedRoute>
);

// 404 Not Found component (you can create a separate file later)
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">404</h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2">Page not found</p>
      <a href="/" className="text-blue-500 hover:underline mt-4 inline-block">Go Home</a>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes (using the layout wrapper) */}
        <Route path="/dashboard" element={<ProtectedRouteWithLayout element={DashboardPage} />} />
        <Route path="/reports" element={<ProtectedRouteWithLayout element={ReportsPage} />} />
        <Route path="/settings" element={<ProtectedRouteWithLayout element={SettingsPage} />} />
        <Route path="/transactions" element={<ProtectedRouteWithLayout element={TransactionsPage} />} />
        <Route path="/account" element={<ProtectedRouteWithLayout element={Account} />} />
        <Route path="/security" element={<ProtectedRouteWithLayout element={Security} />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;