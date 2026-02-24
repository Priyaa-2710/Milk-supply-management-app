import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Add new milk price
export const addMilkPrice = (pricePerLiter) => {
  return axios.post(
    `${BASE_URL}/milk_price`,
    { pricePerLiter },
    getAuthHeader()
  );
};

// Get current milk price
export const getCurrentMilkPrice = () => {
  return axios.get(
    `${BASE_URL}/milk_price/current`,
    getAuthHeader()
  );
};

// Get milk price history
export const getMilkPriceHistory = () => {
  return axios.get(
    `${BASE_URL}/milk_price/history`,
    getAuthHeader()
  );
};
