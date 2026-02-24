const mongoose = require("mongoose");

const milkEntrySchema = new mongoose.Schema(
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
    date: {
      type: String,
      required: true
    },
    session: {
      type: String,
      enum: ["morning", "evening"],
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    pricePerLiter: {
      type: Number,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MilkEntry", milkEntrySchema);