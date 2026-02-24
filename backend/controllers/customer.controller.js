const Customer = require("../models/Customer");

// Add customer
const createCustomer = async (req, res) => {
  try {
    if (!req.admin || !req.admin.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, phone, address } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required" });
    }

    const customer = await Customer.create({
      name,
      phone,
      address,
      user: req.admin.id
    });

    res.status(201).json(customer);
  } catch (error) {
    // Handle duplicate key error properly
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Customer with this phone already exists"
      });
    }

    res.status(500).json({ message: error.message });
  }
};

// Get active customers
const getCustomers = async (req, res) => {
  if (!req.admin || !req.admin.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const customers = await Customer.find({
    user: req.admin.id,
    isActive: true
  }).sort({ name: 1 });

  res.json(customers);
};

// Update customer
const updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findOneAndUpdate(
      { phone: req.params.phone, user: req.admin.id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(updated);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Customer with this phone already exists"
      });
    }

    res.status(500).json({ message: error.message });
  }
};

// Deactivate
const deactivateCustomer = async (req, res) => {
  const customer = await Customer.findOneAndUpdate(
    { phone: req.params.phone, user: req.admin.id },
    { isActive: false },
    { new: true }
  );

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.json({ message: "Customer deactivated", customer });
};

// Inactive list
const getInactiveCustomers = async (req, res) => {
  const customers = await Customer.find({
    user: req.admin.id,
    isActive: false
  }).sort({ name: 1 });

  res.json(customers);
};

// Reactivate
const reactivateCustomer = async (req, res) => {
  const customer = await Customer.findOneAndUpdate(
    { phone: req.params.phone, user: req.admin.id },
    { isActive: true },
    { new: true }
  );

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.json({ message: "Customer reactivated", customer });
};

module.exports = {
  createCustomer,
  getCustomers,
  updateCustomer,
  deactivateCustomer,
  getInactiveCustomers,
  reactivateCustomer
};