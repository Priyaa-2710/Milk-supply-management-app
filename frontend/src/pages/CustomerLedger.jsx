import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCustomerLedger } from "../api/monthlyBill";
import { getCustomers } from "../api/customers.api";
import { getPaymentHistory, addPayment } from "../api/payments";
import axios from "../api/axios";

const CustomerLedger = () => {
  const { customerPhone } = useParams();
  const currentMonth = new Date().toISOString().slice(0, 7);

  const [ledger, setLedger] = useState([]);
  const [entries, setEntries] = useState([]);
  const [payments, setPayments] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [amount, setAmount] = useState("");

  // ================= LOAD CUSTOMER + LEDGER =================
  useEffect(() => {
    const loadData = async () => {
      const [ledgerRes, customersRes, entryRes] = await Promise.all([
        getCustomerLedger(customerPhone),
        getCustomers(),
        axios.get(`/milk-entry/${customerPhone}`)
      ]);

      const ledgerData = ledgerRes.data || [];
      setLedger(ledgerData);

      const customer = customersRes.data.find(
        (c) => c.phone === customerPhone
      );
      setCustomerName(customer?.name || "");

      const monthEntries = (entryRes.data || []).filter((e) =>
        e.date.startsWith(selectedMonth)
      );
      setEntries(monthEntries);

      if (
        ledgerData.length > 0 &&
        !ledgerData.find((b) => b.month === selectedMonth)
      ) {
        setSelectedMonth(ledgerData[0].month);
      }
    };

    loadData();
  }, [customerPhone, selectedMonth]);

  // ================= LOAD PAYMENTS =================
  useEffect(() => {
    if (!selectedMonth) return;
    getPaymentHistory(customerPhone, selectedMonth).then((res) => {
      setPayments(Array.isArray(res.data) ? res.data : []);
    });
  }, [selectedMonth, customerPhone]);

  // ================= ADD PAYMENT =================
  const handleAddPayment = async () => {
    if (!amount) {
      alert("Enter amount");
      return;
    }

    if (!currentBill) {
      alert("No bill for selected month");
      return;
    }

    if (Number(amount) > currentBill.unpaidAmount) {
      alert(
        `Amount exceeds pending balance (₹${currentBill.unpaidAmount})`
      );
      return;
    }

    try {
      await addPayment({
        customerPhone,
        month: selectedMonth,
        amountPaid: Number(amount),
      });

      setAmount("");

      const [ledgerRes, paymentRes] = await Promise.all([
        getCustomerLedger(customerPhone),
        getPaymentHistory(customerPhone, selectedMonth),
      ]);

      setLedger(ledgerRes.data || []);
      setPayments(paymentRes.data || []);
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    }
  };

  const currentBill = ledger.find((b) => b.month === selectedMonth);

  return (
    <div className="min-h-screen bg-[#fff9f0] font-sans p-6 flex flex-col items-center space-y-6">
      <h1 className="text-3xl font-bold text-[#b37c4d] text-center">
        Ledger — {customerName} ({customerPhone})
      </h1>

      {/* ================= MONTH SELECTOR ================= */}
      <div className="w-full max-w-md flex items-center gap-2">
        <label className="text-gray-700 font-medium">Select Month:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b37c4d]"
        />
      </div>

      {/* ================= DAY-WISE LEDGER ================= */}
      <div className="w-full max-w-6xl">
        <h2 className="text-xl font-semibold text-[#8b5e3c] mb-2">Day-wise Milk Ledger</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse bg-white rounded-xl shadow">
            <thead className="bg-[#f8eede] text-[#b37c4d]">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Session</th>
                <th className="px-4 py-2 text-left">Quantity (L)</th>
                <th className="px-4 py-2 text-left">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No entries for this month
                  </td>
                </tr>
              ) : (
                entries.map((e) => (
                  <tr key={e._id} className="border-b">
                    <td className="px-4 py-2">{e.date}</td>
                    <td className="px-4 py-2">{e.session}</td>
                    <td className="px-4 py-2">{e.quantity}</td>
                    <td className="px-4 py-2">{e.amount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MONTHLY SUMMARY ================= */}
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold text-[#8b5e3c] mb-2">Monthly Summary</h2>
        {!currentBill ? (
          <p className="text-gray-600">No bill generated for this month</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse bg-white rounded-xl shadow">
              <thead className="bg-[#f8eede] text-[#b37c4d]">
                <tr>
                  <th className="px-4 py-2 text-left">Total Milk (L)</th>
                  <th className="px-4 py-2 text-left">Billed (₹)</th>
                  <th className="px-4 py-2 text-left">Paid (₹)</th>
                  <th className="px-4 py-2 text-left">Pending (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">{currentBill.totalQuantity}</td>
                  <td className="px-4 py-2">{currentBill.totalAmount}</td>
                  <td className="px-4 py-2">{currentBill.paidAmount}</td>
                  <td className="px-4 py-2">{currentBill.unpaidAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= PAYMENTS ================= */}
      <div className="w-full max-w-4xl flex flex-col items-center space-y-2">
        <h2 className="text-xl font-semibold text-[#8b5e3c]">Payments</h2>
        <div className="w-full flex flex-col sm:flex-row gap-2 mb-2">
          <input
            type="number"
            placeholder="Amount paid"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b37c4d]"
          />
          <button
            onClick={handleAddPayment}
            className="bg-[#f8eede] text-[#b37c4d] py-2 px-4 rounded hover:bg-[#f1dcc8] transition"
          >
            Add Payment
          </button>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full table-auto border-collapse bg-white rounded-xl shadow">
            <thead className="bg-[#f8eede] text-[#b37c4d]">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Amount Paid (₹)</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="2" className="text-center py-4 text-gray-500">
                    No payments yet
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p._id} className="border-b">
                    <td className="px-4 py-2">{p.paymentDate}</td>
                    <td className="px-4 py-2">{p.amountPaid}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerLedger;
