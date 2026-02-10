import axios from "./axios";

export const getTodaySummary = () =>
  axios.get("/admin/today-summary");

export const getPendingBills = (month) =>
  axios.get("/admin/pending-bills", {
    params: { month }
  });

export const getMonthlyCollection = (month) =>
  axios.get("/admin/monthly-collection", {
    params: { month }
  });
