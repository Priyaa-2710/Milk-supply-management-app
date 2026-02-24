const express = require("express");
const cors= require("cors");
const customerRoutes= require("./routes/customer.routes");
const milkPriceRoutes= require("./routes/milkPrice.routes");
const milkEntryRoutes= require("./routes/milkEntry.routes");
const monthlyBillRoutes = require("./routes/monthlyBill.routes");
const adminRoutes = require("./routes/admin.routes");
const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middleware/auth");
const paymentRoutes=require("./routes/payment.routes")

const app = express();

app.use(cors());
app.use(express.json());


app.use("/customers", authMiddleware, customerRoutes)

app.use("/milk_price",authMiddleware,milkPriceRoutes)
app.use("/milk-entry",authMiddleware,milkEntryRoutes)
app.use("/monthly-bill",authMiddleware,monthlyBillRoutes)
app.use("/admin",authMiddleware,adminRoutes)
app.use("/auth", authRoutes);
app.use("/payments", authMiddleware, paymentRoutes);

module.exports=app;