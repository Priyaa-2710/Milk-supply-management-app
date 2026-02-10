// Stores monthly aggregation per customer
const mongoose = require("mongoose");

const monthlyBillSchema = new mongoose.Schema(
  {
    customerPhone: {
      type: String,
      required: true
    },
    month: {
      type: String, // YYYY-MM
      required: true
    },
    totalQuantity: {
      type: Number,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
     paidAmount: {
      type: Number,
      default: 0
    },

    unpaidAmount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MonthlyBill", monthlyBillSchema);
