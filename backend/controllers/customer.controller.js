// Handles business logic for customer operations (add, update, delete customers)
const Customer= require("../models/Customer")

// add customer
const createCustomer = async (req,res)=>{
    try{
        const customer=await Customer.create(req.body);
        res.status(201).json(customer);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}

// get ALL customers
const getCustomers = async (req, res) => {
  const customers = await Customer.find({ isActive: true }).sort({ name: 1 });
  res.json(customers);
};


// update customer
const updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findOneAndUpdate(
      {phone: req.params.phone},
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
const deactivateCustomer = async (req, res) => {
  const { phone } = req.params;

  const customer = await Customer.findOneAndUpdate(
    { phone },
    { isActive: false },
    { new: true }
  );

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.json({ message: "Customer deactivated", customer });
};

const getInactiveCustomers = async (req, res) => {
  const customers = await Customer.find({ isActive: false }).sort({ name: 1 });
  res.json(customers);
};

const reactivateCustomer = async (req, res) => {
  const { phone } = req.params;

  const customer = await Customer.findOneAndUpdate(
    { phone },
    { isActive: true },
    { new: true }
  );

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.json({ message: "Customer reactivated", customer });
};


module.exports= {createCustomer,getCustomers,updateCustomer,deactivateCustomer,getInactiveCustomers,reactivateCustomer}
