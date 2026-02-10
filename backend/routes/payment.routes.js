const express = require("express");
const router = express.Router();
const { addPayment, getPaymentHistory } = require("../controllers/payment.controller");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, addPayment);
router.get("/", authMiddleware, getPaymentHistory);

module.exports = router;
