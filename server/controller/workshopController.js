const Workshop = require("../model/workshopModel");
const { validationResult } = require("express-validator");

class ProductController {
  /**
   * List all workshops/products with pagination and filtering.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves when the products are listed.
   */
  static async listProducts(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        message: "Validation errors",
        data: errors.array(),
      });
    }

    const { page = 1, limit = 10, modality, location } = req.query;

    try {
      const filters = {};
      
      // Add filters if modality or location is provided
      if (modality) filters.modality = modality;
      if (location) filters.location = location;

      // Fetch the products with pagination and filtering
      const products = await Workshop.find(filters)
        .skip((page - 1) * limit)  // Skip the documents for pagination
        .limit(parseInt(limit))    // Limit the results per page
        .exec();

      // Fetch total count for pagination purposes
      const totalProducts = await Workshop.countDocuments(filters).exec();

      res.status(200).json({
        status: 200,
        message: "Products fetched successfully",
        data: {
          products,
          total: totalProducts,
          page: parseInt(page),
          totalPages: Math.ceil(totalProducts / limit),
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error fetching products",
      });
    }
  }

  /**
   * View details of a single product/workshop.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves when the product details are fetched.
   */
  static async viewProduct(req, res) {
    const { id } = req.params;

    try {
      const product = await Workshop.findById(id).exec();

      if (!product) {
        return res.status(404).json({
          status: 404,
          message: "Product not found",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Product details fetched successfully",
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error fetching product details",
      });
    }
  }
}

module.exports = ProductController;
