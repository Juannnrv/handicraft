const express = require("express");
const workshopController = require("../controller/workshopController");
const { versioning } = require("../middleware/versioning");
const router = express.Router();

/**
 * List all products with pagination and filtering options.
 * 
 * @route GET /api/products
 * @query {number} page - Page number for pagination.
 * @query {number} limit - Number of products per page.
 * @query {string} modality - Filter by modality (Presencial or Virtual).
 * @query {string} location - Filter by location.
 */
router.get("/", versioning('1.0.0'),workshopController.listProducts);

/**
 * Get details of a single product/workshop by ID.
 * 
 * @route GET /api/products/{id}
 * @param {string} id - Product ID to fetch details.
 */
router.get("/:id", versioning('1.0.0'),workshopController.viewProduct);

module.exports = router;
