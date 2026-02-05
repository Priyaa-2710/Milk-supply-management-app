const express = require("express");
const router = express.Router();
const {getTodaySummary,getPendingBills,getMonthlyCollection} = require("../controllers/admin.controller");

// Today's milk summary
router.get("/today-summary", getTodaySummary);

// Pending bills for a month
router.get("/pending-bills", getPendingBills);

// Monthly collection totals
router.get("/monthly-collection", getMonthlyCollection);

module.exports = router;
