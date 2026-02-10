import { useEffect, useState } from "react";
import MilkEntryForm from "../components/MilkEntryForm";
import { getMilkEntriesByDate } from "../api/milkEntry.api";

const MilkEntry = () => {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [entries, setEntries] = useState([]);

  const loadEntries = async (selectedDate = date) => {
    const res = await getMilkEntriesByDate(selectedDate);
    setEntries(Array.isArray(res.data) ? res.data : []);
  };

  useEffect(() => {
    loadEntries(date);
  }, [date]);

  return (
    <div className="min-h-screen bg-[#fff9f0] font-sans p-6 flex flex-col items-center space-y-8">
      {/* ================= PAGE TITLE ================= */}
      <h1 className="text-3xl font-bold text-[#b37c4d] text-center">
        Daily Milk Entry
      </h1>

      {/* ================= DATE PICKER ================= */}
      <div className="w-full max-w-xl flex flex-col md:flex-row md:items-center md:justify-between bg-white p-4 rounded-xl shadow space-y-4 md:space-y-0">
        <label className="flex items-center space-x-2">
          <span className="text-[#8b5e3c] font-medium">Select Date:</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b37c4d]"
          />
        </label>
      </div>

      {/* ================= ENTRY FORM ================= */}
      <div className="w-full max-w-xl">
        <MilkEntryForm date={date} onEntryAdded={loadEntries} />
      </div>

      {/* ================= ENTRIES LIST ================= */}
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-6">
  <h2 className="text-xl font-semibold text-[#8b5e3c] mb-4">
    Entries for {date}
  </h2>

  {entries.length === 0 ? (
    <p className="text-gray-600 text-center">No entries for this date</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-[#f8eede]">
          <tr>
            <th className="px-4 py-2 text-left text-[#8b5e3c]">Customer</th>
            <th className="px-4 py-2 text-left text-[#8b5e3c]">Phone</th>
            <th className="px-4 py-2 text-left text-[#8b5e3c]">Quantity (L)</th>
            <th className="px-4 py-2 text-left text-[#8b5e3c]">Session</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr
              key={e._id}
              className="even:bg-[#fff4e0] odd:bg-white"
            >
              <td className="px-4 py-2">{e.customerName}</td>
              <td className="px-4 py-2">{e.customerPhone}</td>
              <td className="px-4 py-2">{e.quantity}</td>
              <td className="px-4 py-2 capitalize">{e.session}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

    </div>
  );
};

export default MilkEntry;
