const PaymentHistory = require("../models/PaymentHistory");
const MonthlyBill = require("../models/MonthlyBill");

const addPayment = async (req, res) => {
  try {
    const { customerPhone, month, amountPaid } = req.body;

    // Basic validation
    if (!customerPhone || !month || !amountPaid || amountPaid <= 0) {
      return res.status(400).json({ message: "Invalid payment data" });
    }

    const today = new Date().toISOString().slice(0, 10);

    // Find monthly bill first (source of truth)
    const bill = await MonthlyBill.findOne({ customerPhone, month });
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    // 🔒 HARD BLOCK: prevent over-payment
    if (amountPaid > bill.unpaidAmount) {
      return res.status(400).json({
        message: `Payment exceeds pending amount (₹${bill.unpaidAmount})`,
      });
    }

    // Save payment record
    await PaymentHistory.create({
      customerPhone,
      month,
      amountPaid,
      paymentDate: today,
    });

    // Update monthly bill
    bill.paidAmount += amountPaid;
    bill.unpaidAmount -= amountPaid;
    bill.isPaid = bill.unpaidAmount === 0;

    await bill.save();

    res.json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
 

const getPaymentHistory = async (req, res) => {
  try {
    const { customerPhone, month } = req.query;

    const payments = await PaymentHistory.find({
      customerPhone,
      month
    }).sort({ paymentDate: 1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { addPayment , getPaymentHistory};
