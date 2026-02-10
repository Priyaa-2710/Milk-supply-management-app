import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getTodaySummary,
  getPendingBills,
  getMonthlyCollection,
} from "../api/admin";

const Dashboard = () => {
  const month = new Date().toISOString().slice(0, 7); // YYYY-MM

  const [today, setToday] = useState(null);
  const [pendingBills, setPendingBills] = useState([]);
  const [monthly, setMonthly] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [todayRes, pendingRes, monthlyRes] = await Promise.all([
          getTodaySummary(),
          getPendingBills(month),
          getMonthlyCollection(month),
        ]);

        setToday(todayRes.data);
        setPendingBills(Array.isArray(pendingRes.data) ? pendingRes.data : []);
        setMonthly(monthlyRes.data);
      } catch (error) {
        console.error("Dashboard fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [month]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen font-sans">
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );

  const totalMilkToday =
    (today?.morningTotal || 0) + (today?.eveningTotal || 0);

  const pendingAmount = pendingBills.reduce(
    (sum, bill) => sum + (bill.unpaidAmount || 0),
    0
  );

 return (
  <div className="min-h-screen bg-[#fff9f0] font-sans flex flex-col items-center p-6 space-y-6">
    <h1 className="text-3xl font-bold text-[#b37c4d]">Admin Dashboard</h1>

    {/* ================= HORIZONTAL SECTIONS ================= */}
    <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
      {/* TODAY SUMMARY */}
      <section className="flex-1 bg-white rounded-xl shadow p-6 space-y-2">
        <h2 className="text-xl font-semibold text-[#8b5e3c]">
          Today Summary ({today?.date})
        </h2>
        <p>Morning Milk: {today?.morningTotal || 0} L</p>
        <p>Evening Milk: {today?.eveningTotal || 0} L</p>
        <p>
          <strong>Total Milk: {totalMilkToday} L</strong>
        </p>
        <p>
          <strong>Total Amount: ₹{today?.totalAmount || 0}</strong>
        </p>
      </section>

      {/* PENDING BILLS */}
      <section className="flex-1 bg-white rounded-xl shadow p-6 space-y-2">
        <h2 className="text-xl font-semibold text-[#8b5e3c]">Pending Bills</h2>
        <p>Total Pending Bills: {pendingBills.length}</p>
        <p>
          <strong>Total Pending Amount: ₹{pendingAmount}</strong>
        </p>
      </section>

      {/* MONTHLY COLLECTION */}
      <section className="flex-1 bg-white rounded-xl shadow p-6 space-y-2">
        <h2 className="text-xl font-semibold text-[#8b5e3c]">
          Monthly Collection ({month})
        </h2>
        <p>
          <strong>Billed: ₹{monthly?.totalAmount || 0}</strong>
        </p>
        <p>
          <strong>Collected: ₹{monthly?.totalPaid || 0}</strong>
        </p>
        <p>
          <strong>Pending: ₹{monthly?.totalPending || 0}</strong>
        </p>
      </section>
    </div>

    {/* ================= QUICK ACTIONS HORIZONTAL ================= */}
<section className="w-full max-w-6xl flex flex-col items-center gap-4">
  <h2 className="text-xl font-semibold text-[#8b5e3c] mb-2">Quick Actions</h2>
  <div className="w-full flex flex-wrap gap-4 justify-center">
    <Link
      to="/customers"
      className="flex-1 min-w-[150px] bg-[#f8eede] text-[#b37c4d] py-2 px-4 rounded hover:bg-[#f1dcc8] text-center transition"
    >
      Customers
    </Link>
    <Link
      to="/milk-entry"
      className="flex-1 min-w-[150px] bg-[#f8eede] text-[#b37c4d] py-2 px-4 rounded hover:bg-[#f1dcc8] text-center transition"
    >
      Daily Milk Entry
    </Link>
    <Link
      to="/milk-price"
      className="flex-1 min-w-[150px] bg-[#f8eede] text-[#b37c4d] py-2 px-4 rounded hover:bg-[#f1dcc8] text-center transition"
    >
      Milk Price
    </Link>
    <Link
      to="/monthly-bill"
      className="flex-1 min-w-[150px] bg-[#f8eede] text-[#b37c4d] py-2 px-4 rounded hover:bg-[#f1dcc8] text-center transition"
    >
      Monthly Billing
    </Link>
  </div>
</section>

  </div>
);

};

export default Dashboard;
