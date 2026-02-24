import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const addMilkEntry = (data) => {
  return axios.post(`${BASE_URL}/milk-entry`, data, authHeader());
};

export const getMilkEntriesByDate = (date) => {
  return axios.get(
    `${BASE_URL}/milk-entry?date=${date}`,
    authHeader()
  );
};
