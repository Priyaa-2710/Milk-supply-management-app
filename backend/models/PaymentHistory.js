const mongoose = require("mongoose");

const paymentHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true
    },
    customerPhone: {
      type: String,
      required: true
    },
    month: {
      type: String,
      required: true
    },
    amountPaid: {
      type: Number,
      required: true
    },
    paymentDate: {
      type: String,
      required: true
    },
    method: {
      type: String,
      default: "cash"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentHistory", paymentHistorySchema);