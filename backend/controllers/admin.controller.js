// Handles aggregations for the dashboard
const MilkEntry = require("../models/MilkEntry");
const MonthlyBill = require("../models/MonthlyBill");
const Customer = require("../models/Customer");

// Get today's milk totals and amount
const getTodaySummary = async (req, res) => {
  try {
    const today = req.query.date || new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const entries = await MilkEntry.find({ date: today });

    let morningTotal = 0;
    let eveningTotal = 0;
    let totalAmount = 0;

    entries.forEach((entry) => {
      totalAmount += entry.amount;
      if (entry.session === "morning") morningTotal += entry.quantity;
      else if (entry.session === "evening") eveningTotal += entry.quantity;
    });

    res.json({
      date: today,
      morningTotal,
      eveningTotal,
      totalAmount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get pending monthly bills
const getPendingBills = async (req, res) => {
  try {
    const { month } = req.query; // YYYY-MM
    const bills = await MonthlyBill.find({ month, isPaid: false }).sort({ customerPhone: 1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get total collection for a month
const getMonthlyCollection = async (req, res) => {
  try {
    const { month } = req.query;
    const bills = await MonthlyBill.find({ month });
    const totalAmount = bills.reduce((sum, bill) => sum + bill.totalAmount, 0);
    const totalPending = bills
      .filter((bill) => !bill.isPaid)
      .reduce((sum, bill) => sum + bill.totalAmount, 0);

    res.json({ month, totalAmount, totalPending });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports={getTodaySummary,getPendingBills,getMonthlyCollection}