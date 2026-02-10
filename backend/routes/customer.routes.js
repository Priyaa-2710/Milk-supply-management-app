// Maps HTTP endpoints to controller logic
const express = require("express");
const router = express.Router()
const {createCustomer,getCustomers,updateCustomer,deactivateCustomer,getInactiveCustomers,reactivateCustomer} = require("../controllers/customer.controller")


router.post("/", createCustomer);
router.get("/", getCustomers);
router.put("/:phone",updateCustomer);
router.put("/:phone/deactivate", deactivateCustomer);
router.get("/inactive", getInactiveCustomers);
router.put("/:phone/reactivate", reactivateCustomer);



module.exports= router;