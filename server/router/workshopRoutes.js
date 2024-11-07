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
router.get("/", versioning('1.0.0'),workshopController.listWorkshops);



/**
 * Search workshops based on criteria (modality, location, craft type).
 * 
 * @route GET /api/workshops/search
 * @query {string} modality - Filter by modality (Presencial or Virtual).
 * @query {string} location - Filter by location.
 * @query {string} craftType - Filter by type of craft (if you add this field).
 */
router.get("/search", versioning('1.0.0'), workshopController.searchWorkshops);

/**
 * Get details of a single product/workshop by ID.
 * 
 * @route GET /api/products/{id}
 * @param {string} id - Product ID to fetch details.
 */
router.get("/:id", versioning('1.0.0'),workshopController.viewWorkshop);

module.exports = router;
