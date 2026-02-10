const express = require("express");
const router = express.Router();
const {generateMonthlyBills,getMonthlyBills,updateBillStatus,getCustomerLedger} = require("../controllers/monthlyBill.controller");

// Generate bills
router.post("/generate", generateMonthlyBills);

// Get all bills for a month
router.get("/", getMonthlyBills);

// Update bill status (paid/unpaid)
router.put("/status", updateBillStatus);

router.get("/ledger/:customerPhone", getCustomerLedger);


module.exports = router;
