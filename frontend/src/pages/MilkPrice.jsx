import { useEffect, useState } from "react";
import {
  getCurrentMilkPrice,
  getMilkPriceHistory,
} from "../api/milkPrice";
import MilkPriceForm from "../components/MilkPriceForm";

const MilkPrice = () => {
  const [currentPrice, setCurrentPrice] = useState(null);
  const [history, setHistory] = useState([]);

  const loadData = async () => {
    try {
      const currentRes = await getCurrentMilkPrice();
      const historyRes = await getMilkPriceHistory();

      setCurrentPrice(currentRes.data);
      setHistory(Array.isArray(historyRes.data) ? historyRes.data : []);
    } catch (err) {
      alert("Failed to load milk price data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#fff9f0] font-sans p-6 flex flex-col items-center space-y-8">
      {/* ================= PAGE TITLE ================= */}
      <h1 className="text-3xl font-bold text-[#b37c4d] text-center">
        Milk Price
      </h1>

      {/* ================= MILK PRICE FORM ================= */}
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-6">
        <MilkPriceForm onPriceAdded={loadData} />
      </div>

      {/* ================= CURRENT PRICE ================= */}
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-6 text-center">
        <h2 className="text-xl font-semibold text-[#8b5e3c] mb-2">
          Current Price
        </h2>
        {currentPrice ? (
          <p className="text-2xl font-bold text-[#b37c4d]">
            ₹ {currentPrice.pricePerLiter} / liter
          </p>
        ) : (
          <p className="text-gray-600">No price set</p>
        )}
      </div>

      {/* ================= PRICE HISTORY ================= */}
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-[#8b5e3c] mb-4">
          Price History
        </h2>
        {history.length === 0 ? (
          <p className="text-gray-600 text-center">No history yet</p>
        ) : (
          <ul className="space-y-2">
            {history.map((item) => (
              <li
                key={item._id}
                className="flex justify-between bg-[#f8eede] rounded px-4 py-2"
              >
                <span>₹ {item.pricePerLiter} / liter</span>
                <span className="text-gray-600">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MilkPrice;
