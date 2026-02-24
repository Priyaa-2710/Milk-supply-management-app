const Customer = require("../models/Customer");

// Add customer
const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create({
      ...req.body,
      user: req.admin.id
    });

    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get active customers (ONLY for logged-in admin)
const getCustomers = async (req, res) => {
  const customers = await Customer.find({
    user: req.admin.id,
    isActive: true
  }).sort({ name: 1 });

  res.json(customers);
};

// Update customer (scoped by user)
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
    res.status(400).json({ message: error.message });
  }
};

// Deactivate customer
const deactivateCustomer = async (req, res) => {
  const { phone } = req.params;

  const customer = await Customer.findOneAndUpdate(
    { phone, user: req.admin.id },
    { isActive: false },
    { new: true }
  );

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.json({ message: "Customer deactivated", customer });
};

// Get inactive customers
const getInactiveCustomers = async (req, res) => {
  const customers = await Customer.find({
    user: req.admin.id,
    isActive: false
  }).sort({ name: 1 });

  res.json(customers);
};

// Reactivate customer
const reactivateCustomer = async (req, res) => {
  const { phone } = req.params;

  const customer = await Customer.findOneAndUpdate(
    { phone, user: req.admin.id },
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