import axios from "./axios";

export const loginRequest = async (credentials) => {
  const res = await axios.post("/auth/login", credentials);
  return res.data; // expects token from backend
};


export const registerRequest = async (data) => {
  const res = await axios.post("/auth/register", data);
  return res.data;
};
