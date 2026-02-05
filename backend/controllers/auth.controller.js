// Handle login and token issuance
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

// Admin registration
const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username already exists
    const existing = await Admin.findOne({ username });
    if (existing) return res.status(400).json({ message: "Username already exists" });

    const admin = await Admin.create({ username, password });

    res.status(201).json({ message: "Admin registered successfully", username: admin.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Admin login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("token",token)

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports= {login,register}