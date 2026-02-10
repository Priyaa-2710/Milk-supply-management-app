import { useState } from "react";
import { addMilkPrice } from "../api/milkPrice";

const MilkPriceForm = ({ onPriceAdded }) => {
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!price) return alert("Enter price");

    try {
      setLoading(true);
      await addMilkPrice(Number(price));
      setPrice("");
      onPriceAdded(); // refresh data
    } catch (err) {
      alert(err.response?.data?.message || "Error adding price");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#fff4e0] p-6 rounded-xl shadow space-y-4"
    >
      <h3 className="text-lg font-semibold text-[#8b5e3c]">
        Set Milk Price (per liter)
      </h3>

      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter price"
        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b37c4d]"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-[#b37c4d] text-white px-4 py-2 rounded hover:bg-[#8b5e3c] transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default MilkPriceForm;
