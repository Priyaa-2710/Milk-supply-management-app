import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false, // token handled in frontend, header-based
});

// token injector (read-only responsibility)
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
