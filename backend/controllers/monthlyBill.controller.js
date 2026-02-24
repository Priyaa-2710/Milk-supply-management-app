// Generates and retrieves monthly bills
const MonthlyBill = require("../models/MonthlyBill");
const MilkEntry = require("../models/MilkEntry");
const Customer = require("../models/Customer");

// Generate monthly bill for all customers
const generateMonthlyBills = async (req, res) => {
  try {
    const { month } = req.body;

    const customers = await Customer.find({
      isActive: true,
      user: req.admin.id
    });

    const bills = [];

    for (const customer of customers) {
      const entries = await MilkEntry.find({
        customerPhone: customer.phone,
        date: { $regex: `^${month}` },
        user: req.admin.id
      });

      if (entries.length === 0) continue;

      const totalQuantity = entries.reduce((s, e) => s + e.quantity, 0);
      const totalAmount = entries.reduce((s, e) => s + e.amount, 0);

      const existingBill = await MonthlyBill.findOne({
        customerPhone: customer.phone,
        month,
        user: req.admin.id
      });

      let paidAmount = existingBill?.paidAmount || 0;
      let unpaidAmount = totalAmount - paidAmount;

      if (unpaidAmount < 0) unpaidAmount = 0;

      const bill = await MonthlyBill.findOneAndUpdate(
        {
          customerPhone: customer.phone,
          month,
          user: req.admin.id
        },
        {
          totalQuantity,
          totalAmount,
          paidAmount,
          unpaidAmount,
          user: req.admin.id
        },
        { new: true, upsert: true }
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

    const bills = await MonthlyBill.find({
      month,
      user: req.admin.id
    }).sort({ customerPhone: 1 });

    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark bill as paid/unpaid
const updateBillStatus = async (req, res) => {
  try {
    const { customerPhone, month, amountPaid } = req.body;

    const bill = await MonthlyBill.findOne({
      customerPhone,
      month,
      user: req.admin.id
    });

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    const newPaid = bill.paidAmount + amountPaid;
    const newUnpaid = bill.totalAmount - newPaid;

    bill.paidAmount = newPaid;
    bill.unpaidAmount = newUnpaid < 0 ? 0 : newUnpaid;

    await bill.save();

    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Customer-wise monthly ledger
const getCustomerLedger = async (req, res) => {
  try {
    const { customerPhone } = req.params;

    const bills = await MonthlyBill.find({
      customerPhone,
      user: req.admin.id
    }).sort({ month: -1 });

    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  generateMonthlyBills,
  getMonthlyBills,
  updateBillStatus,
  getCustomerLedger
};