import axios from "./axios";

// GET /customers
export const getCustomers = () => {
  return axios.get("/customers");
};

// POST /customers
export const createCustomer = (data) => {
  return axios.post("/customers", data);
};

// PUT /customers/:phone
export const updateCustomer = (phone, data) => {
  return axios.put(`/customers/${phone}`, data);
};

export const deactivateCustomer = (phone) => {
  return axios.put(`/customers/${phone}/deactivate`);
};

export const getInactiveCustomers = () => {
  return axios.get("/customers/inactive");
};

export const reactivateCustomer = (phone) => {
  return axios.put(`/customers/${phone}/reactivate`);
};
