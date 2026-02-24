const mongoose = require("mongoose");
const MilkEntry = require("../models/MilkEntry");
const MilkPrice = require("../models/MilkPrice");
const Customer = require("../models/Customer");

// Add milk entry
const addMilkEntry = async (req, res) => {
  try {
    if (!req.admin || !req.admin.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { customerPhone, date, session, quantity } = req.body;

    const customer = await Customer.findOne({
      phone: customerPhone,
      user: req.admin.id
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const latestPrice = await MilkPrice.findOne({
      user: req.admin.id
    }).sort({ effectiveFrom: -1 });

    if (!latestPrice) {
      return res.status(400).json({ message: "No milk price set" });
    }

    const amount = quantity * latestPrice.pricePerLiter;

    const entry = await MilkEntry.create({
      user: req.admin.id,
      customerPhone,
      date,
      session,
      quantity,
      pricePerLiter: latestPrice.pricePerLiter,
      amount
    });

    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get entries by date
const getMilkEntriesByDate = async (req, res) => {
  try {
    if (!req.admin || !req.admin.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const adminId = new mongoose.Types.ObjectId(req.admin.id);

    const entries = await MilkEntry.aggregate([
      {
        $match: {
          date,
          user: adminId
        }
      },
      {
        $lookup: {
          from: "customers",
          localField: "customerPhone",
          foreignField: "phone",
          as: "customer"
        }
      },
      {
        $unwind: {
          path: "$customer",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          customerPhone: 1,
          customerName: { $ifNull: ["$customer.name", "—"] },
          date: 1,
          session: 1,
          quantity: 1,
          pricePerLiter: 1,
          amount: 1
        }
      },
      { $sort: { session: 1 } }
    ]);

    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get entries by customer
const getEntriesByCustomer = async (req, res) => {
  try {
    const entries = await MilkEntry.find({
      customerPhone: req.params.customerPhone,
      user: req.admin.id
    }).sort({ date: -1 });

    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addMilkEntry,
  getMilkEntriesByDate,
  getEntriesByCustomer
};