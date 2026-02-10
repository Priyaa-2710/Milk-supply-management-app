import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import MilkPrice from "../pages/MilkPrice";
import ProtectedRoute from "../components/ProtectedRoute";
import MilkEntry from "../pages/MilkEntry";
import MonthlyBill from "../pages/MonthlyBill";
import CustomerLedger from "../pages/CustomerLedger";
import Customers from "../pages/Customers";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected */}
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
    </Routes>
  );
};

export default AppRoutes;
