const mongoose = require("mongoose");

const milkPriceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true
    },
    pricePerLiter: {
      type: Number,
      required: true
    },
    effectiveFrom: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MilkPrice", milkPriceSchema);