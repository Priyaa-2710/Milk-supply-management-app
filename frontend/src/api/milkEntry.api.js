import axios from "axios";

const BASE_URL = "http://localhost:3000";

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
