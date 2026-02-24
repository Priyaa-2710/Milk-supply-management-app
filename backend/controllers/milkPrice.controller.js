const MilkPrice = require("../models/MilkPrice");

// Add a new milk price
const addPrice = async (req, res) => {
  try {
    const { pricePerLiter, effectiveFrom } = req.body;

    const price = await MilkPrice.create({
      pricePerLiter,
      effectiveFrom: effectiveFrom || Date.now(),
      user: req.admin.id
    });

    res.status(201).json(price);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get latest price
const getCurrentPrice = async (req, res) => {
  try {
    const price = await MilkPrice.findOne({
      user: req.admin.id
    }).sort({ effectiveFrom: -1 });

    res.json(price);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get price history
const getPriceHistory = async (req, res) => {
  try {
    const prices = await MilkPrice.find({
      user: req.admin.id
    }).sort({ effectiveFrom: -1 });

    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addPrice, getCurrentPrice, getPriceHistory };