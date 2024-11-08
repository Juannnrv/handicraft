const express = require("express");
const { listProducts, findProductById, searchProduct } = require("../controller/productController");
const { limit } = require("../middleware/limit");
const { versioning } = require("../middleware/versioning");
const product = express.Router();

product.get("/", limit('get'), versioning('1.0.0'), listProducts);
product.get("/search", limit('get'), versioning('1.0.0'), searchProduct);
product.get("/:id", limit('get'), versioning('1.0.0'), findProductById);

module.exports = product;