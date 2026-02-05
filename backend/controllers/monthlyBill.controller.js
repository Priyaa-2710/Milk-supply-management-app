// Generates and retrieves monthly bills
const MonthlyBill = require("../models/MonthlyBill");
const MilkEntry = require("../models/MilkEntry");
const Customer = require("../models/Customer");

// Generate monthly bill for all customers
const generateMonthlyBills = async (req, res) => {
  try {
    const { month } = req.body; // "YYYY-MM"

    // Get all active customers
    const customers = await Customer.find({ isActive: true });

    const bills = [];

    for (const customer of customers) {
      // Get milk entries for this customer for the month
      const entries = await MilkEntry.find({
        customerPhone: customer.phone,
        date: { $regex: `^${month}` } // matches YYYY-MM
      });

      const totalQuantity = entries.reduce((sum, entry) => sum + entry.quantity, 0);
      const totalAmount = entries.reduce((sum, entry) => sum + entry.amount, 0);

      if (entries.length === 0) continue; // skip if no entries

      // Create or update MonthlyBill
      const bill = await MonthlyBill.findOneAndUpdate(
        { customerPhone: customer.phone, month },
        { totalQuantity, totalAmount },
        { new: true, upsert: true } // create if not exists
      );

      bills.push(bill);
    }

    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bills for a month
const getMonthlyBills = async (req, res) => {
  try {
    const { month } = req.query;
    const bills = await MonthlyBill.find({ month }).sort({ customerPhone: 1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark bill as paid/unpaid
const updateBillStatus = async (req, res) => {
  try {
    const { customerPhone, month, isPaid } = req.body;
    const bill = await MonthlyBill.findOneAndUpdate(
      { customerPhone, month },
      { isPaid },
      { new: true }
    );
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports={generateMonthlyBills,getMonthlyBills,updateBillStatus}