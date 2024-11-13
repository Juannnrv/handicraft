const express = require("express");
const { createOrder, findAllOrders } = require("../controller/orderController");
const { limit } = require("../middleware/limit");
const { versioning } = require("../middleware/versioning");
const { orderValidationRules } = require("../validator/orderValidator");
const order = express.Router();

order.post("/create", limit('post'), versioning('1.0.0'), orderValidationRules(), createOrder);
order.get("/", limit('get'), versioning('1.0.0'), findAllOrders);

module.exports = order;
