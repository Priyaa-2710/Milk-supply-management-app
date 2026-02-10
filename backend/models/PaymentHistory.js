const mongoose = require("mongoose");

const paymentHistorySchema = new mongoose.Schema(
  {
    customerPhone: {
      type: String,
      required: true
    },
    month: {
      type: String, // YYYY-MM
      required: true
    },
    amountPaid: {
      type: Number,
      required: true
    },
    paymentDate: {
      type: String, // YYYY-MM-DD
      required: true
    },
    method: {
      type: String,
      default: "cash" // future-proof
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentHistory", paymentHistorySchema);
