import axios from "./axios";

export const loginRequest = async (credentials) => {
  const res = await axios.post("/auth/login", credentials);
  return res.data; // expects token from backend
};
