import axios from "./axios";

/**
 * Generate bills for a given month
 * POST /monthly-bill/generate
 */
export const generateMonthlyBills = (month) => {
  return axios.post("/monthly-bill/generate", { month });
};

/**
 * Get all bills for a month
 * GET /monthly-bill?month=YYYY-MM
 */
export const getMonthlyBills = (month) => {
  return axios.get(`/monthly-bill?month=${month}`);
};

/**
 * Update bill payment status
 * PUT /monthly-bill/status
 */
export const updateBillStatus = (data) =>
  axios.put("/monthly-bill/status", data);

export const getCustomerLedger = (customerPhone) =>
  axios.get(`/monthly-bill/ledger/${customerPhone}`);
