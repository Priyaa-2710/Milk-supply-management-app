import axios from "./axios";

// Get all milk entries for a customer
export const getCustomerMilkEntries = (customerPhone) => {
  return axios.get(`/milk-entry/${customerPhone}`);
};

// Get monthly bills (we will filter by customer)
export const getMonthlyBills = (month) => {
  return axios.get(`/monthly-bill?month=${month}`);
};
