import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import MilkPrice from "../pages/MilkPrice";
import ProtectedRoute from "../components/ProtectedRoute";
import MilkEntry from "../pages/MilkEntry";
import MonthlyBill from "../pages/MonthlyBill";
import CustomerLedger from "../pages/CustomerLedger";
import Customers from "../pages/Customers";

const AppRoutes = () => {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={!token ? <Login /> : <Navigate to="/" replace />}
      />

      <Route
        path="/register"
        element={!token ? <Register /> : <Navigate to="/" replace />}
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/milk-price"
        element={
          <ProtectedRoute>
            <MilkPrice />
          </ProtectedRoute>
        }
      />

      <Route
        path="/milk-entry"
        element={
          <ProtectedRoute>
            <MilkEntry />
          </ProtectedRoute>
        }
      />

      <Route
        path="/monthly-bill"
        element={
          <ProtectedRoute>
            <MonthlyBill />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ledger/:customerPhone"
        element={
          <ProtectedRoute>
            <CustomerLedger />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <Customers />
          </ProtectedRoute>
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;