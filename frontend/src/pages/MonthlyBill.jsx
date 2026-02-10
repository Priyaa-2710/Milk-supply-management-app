import { useEffect, useState } from "react";
import { getCustomers } from "../api/customers.api";
import { generateMonthlyBills, getMonthlyBills } from "../api/monthlyBill";
import { addPayment } from "../api/payments";

const MonthlyBill = () => {
  const currentMonth = new Date().toISOString().slice(0, 7);

  const [month, setMonth] = useState(currentMonth);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customerMap, setCustomerMap] = useState({});
  const [payAmount, setPayAmount] = useState({});

  // Load customers
  useEffect(() => {
    getCustomers().then((res) => {
      const map = {};
      res.data.forEach((c) => {
        map[c.phone] = c.name;
      });
      setCustomerMap(map);
    });
  }, []);

  const fetchBills = async () => {
    const res = await getMonthlyBills(month);
    setBills(res.data);
  };

  const generateBills = async () => {
    setLoading(true);
    await generateMonthlyBills(month);
    await fetchBills();
    setLoading(false);
  };

  const handlePay = async (bill) => {
    const amount = Number(payAmount[bill._id]);

    if (!amount || amount <= 0) {
      alert("Enter valid amount");
      return;
    }

    if (amount > bill.unpaidAmount) {
      alert(`Cannot pay more than pending ₹${bill.unpaidAmount}`);
      return;
    }

    try {
      const res = await addPayment({
        customerPhone: bill.customerPhone,
        month,
        amountPaid: amount,
      });

      setBills((prev) =>
        prev.map((b) => (b._id === bill._id ? res.data : b))
      );

      setPayAmount({ ...payAmount, [bill._id]: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    }
  };

  useEffect(() => {
    fetchBills();
  }, [month]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#b37c4d] mb-4">
        Monthly Billing
      </h2>

      {/* Month selector and generate button */}
      <div className="flex items-center space-x-4 mb-6">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#b37c4d]"
        />
        <button
          onClick={generateBills}
          disabled={loading}
          className="bg-[#b37c4d] text-white px-4 py-2 rounded hover:bg-[#8b5e3c] transition"
        >
          {loading ? "Generating..." : "Generate Bills"}
        </button>
      </div>

      {/* Bills Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#f8eede]">
            <tr>
              <th className="px-4 py-2 text-left text-[#8b5e3c]">Customer</th>
              <th className="px-4 py-2 text-left text-[#8b5e3c]">Phone</th>
              <th className="px-4 py-2 text-right text-[#8b5e3c]">Total Milk (L)</th>
              <th className="px-4 py-2 text-right text-[#8b5e3c]">Total (₹)</th>
              <th className="px-4 py-2 text-right text-[#8b5e3c]">Paid (₹)</th>
              <th className="px-4 py-2 text-right text-[#8b5e3c]">Unpaid (₹)</th>
              <th className="px-4 py-2 text-center text-[#8b5e3c]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bills.map((bill) => (
              <tr key={bill._id} className="even:bg-[#fff4e0] odd:bg-white">
                <td className="px-4 py-2">{customerMap[bill.customerPhone] || "—"}</td>
                <td className="px-4 py-2">{bill.customerPhone}</td>
                <td className="px-4 py-2 text-right">{bill.totalQuantity}</td>
                <td className="px-4 py-2 text-right">{bill.totalAmount}</td>
                <td className="px-4 py-2 text-right">{bill.paidAmount}</td>
                <td className="px-4 py-2 text-right">{bill.unpaidAmount}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <input
                    type="number"
                    placeholder="Pay ₹"
                    value={payAmount[bill._id] || ""}
                    onChange={(e) =>
                      setPayAmount({
                        ...payAmount,
                        [bill._id]: e.target.value,
                      })
                    }
                    className="w-20 border border-gray-300 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-[#b37c4d]"
                  />
                  <button
                    onClick={() => handlePay(bill)}
                    className="bg-[#b37c4d] text-white px-3 py-1 rounded hover:bg-[#8b5e3c] transition"
                  >
                    Pay
                  </button>
                </td>
              </tr>
            ))}
            {bills.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No bills found for this month
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyBill;
