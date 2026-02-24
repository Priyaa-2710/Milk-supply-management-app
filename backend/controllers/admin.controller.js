const MilkEntry = require("../models/MilkEntry");
const MonthlyBill = require("../models/MonthlyBill");
const Customer = require("../models/Customer");

// Get today's milk totals and amount
const getTodaySummary = async (req, res) => {
  try {
    const today = req.query.date || new Date().toISOString().slice(0, 10);

    const entries = await MilkEntry.find({
      date: today,
      user: req.admin.id
    });

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
    const month =
      req.query.month || new Date().toISOString().slice(0, 7);

    const bills = await MonthlyBill.find({
      month,
      unpaidAmount: { $gt: 0 },
      user: req.admin.id
    }).sort({ customerPhone: 1 });

    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get total collection for a month
const getMonthlyCollection = async (req, res) => {
  try {
    const { month } = req.query;

    const bills = await MonthlyBill.find({
      month,
      user: req.admin.id
    });

    const totalAmount = bills.reduce((s, b) => s + b.totalAmount, 0);
    const totalPaid = bills.reduce((s, b) => s + b.paidAmount, 0);
    const totalPending = bills.reduce((s, b) => s + b.unpaidAmount, 0);

    res.json({
      month,
      totalAmount,
      totalPaid,
      totalPending
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports={getTodaySummary,getPendingBills,getMonthlyCollection}