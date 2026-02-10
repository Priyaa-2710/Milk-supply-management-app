import { useEffect, useState } from "react";
import { getCustomers } from "../api/customers.api";
import { addMilkEntry } from "../api/milkEntry.api";

const MilkEntryForm = ({ date, onEntryAdded }) => {
  const [customers, setCustomers] = useState([]);
  const [customerPhone, setCustomerPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [session, setSession] = useState("morning");

  useEffect(() => {
    getCustomers().then((res) => setCustomers(res.data));
  }, []);

const submit = async (e) => {
  e.preventDefault();

  if (!customerPhone || !quantity || !session) {
    alert("All fields are required");
    return;
  }

  try {
    await addMilkEntry({
      customerPhone,
      quantity: Number(quantity),
      session,
      date,
    });

    setQuantity("");
    onEntryAdded(date);
  } catch (err) {
    console.error(err.response?.data);
    alert(err.response?.data?.message || "Failed to add entry");
  }
};


   return (
    <form
      onSubmit={submit}
      className="bg-[#fff4e0] p-6 rounded-xl shadow space-y-4"
    >
      <h3 className="text-lg font-semibold text-[#8b5e3c]">
        Add Milk Entry
      </h3>

      {/* Customer dropdown */}
      <select
        value={customerPhone}
        onChange={(e) => setCustomerPhone(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b37c4d]"
      >
        <option value="">Select customer</option>
        {customers.map((c) => (
          <option key={c.phone} value={c.phone}>
            {c.name} ({c.phone})
          </option>
        ))}
      </select>

      {/* Quantity */}
      <input
        type="number"
        placeholder="Quantity (liters)"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b37c4d]"
      />

      {/* Session radios */}
      <div className="flex items-center space-x-6">
        <label className="flex items-center space-x-1">
          <input
            type="radio"
            value="morning"
            checked={session === "morning"}
            onChange={(e) => setSession(e.target.value)}
            className="accent-[#b37c4d]"
          />
          <span>Morning</span>
        </label>

        <label className="flex items-center space-x-1">
          <input
            type="radio"
            value="evening"
            checked={session === "evening"}
            onChange={(e) => setSession(e.target.value)}
            className="accent-[#b37c4d]"
          />
          <span>Evening</span>
        </label>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full bg-[#b37c4d] text-white px-4 py-2 rounded hover:bg-[#8b5e3c] transition"
      >
        Add Entry
      </button>
    </form>
  );
};

export default MilkEntryForm;
