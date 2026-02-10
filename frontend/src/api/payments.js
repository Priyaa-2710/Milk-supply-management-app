import axios from "./axios";

/**
 * Get payment history for a customer & month
 * GET /payments?customerPhone=&month=
 */
export const getPaymentHistory = (customerPhone, month) => {
  return axios.get(
    `/payments?customerPhone=${customerPhone}&month=${month}`
  );
};

/**
 * Add a payment
 * POST /payments
 */
export const addPayment = (data) => {
  return axios.post("/payments", data);
};
