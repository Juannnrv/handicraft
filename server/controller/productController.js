const Product = require("../model/productModel");

class ProductController {
  /**
   * Retrieves a list of products based on the provided query parameters.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves when the products are retrieved successfully or rejects with an error.
   */
  static async listProducts(req, res) {
    try {
        const { page = 1, limit = 10, category, minPrice, maxPrice, workshopId } = req.query;

        let filter = {};
        if (category) {
            filter.category = category;
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) {
                filter.price.$gte = parseFloat(minPrice);
            }
            if (maxPrice) {
                filter.price.$lte = parseFloat(maxPrice);
            }
        }
        if (workshopId) {
            filter.workshopId = workshopId;
        }

        const skip = (page - 1) * limit;

        const products = await Product.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .exec();

        const total = await Product.countDocuments(filter);

        res.status(200).json({
            status: 200,
            message: "Products retrieved successfully",
            data: {
                products,
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error retrieving products",
            error: error.message,
        });
    }
}


  /**
   * Retrieves a product by its ID.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves when the product is retrieved.
   */
  static async findProductById(req, res) {
    const { id } = req.params;

    try {
      const product = await Product.findById(id)
        .populate('workshopId')  // Populamos el campo workshopId
        .exec(); 
      if (!product) {
        return res.status(404).json({
          status: 404,
          message: "Product not found",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Product retrieved successfully",
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error retrieving product",
        error: error.message,
      });
    }
  }

  /**
   * Search for products based on a query.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves when the search is complete.
   */
  static async searchProduct(req, res) {
    const { query } = req.query;

    try {
      const products = await Product.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      }).exec();

      res.status(200).json({
        status: 200,
        message: "Products retrieved successfully",
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error retrieving products",
        error: error.message,
      });
    }
  }
}

module.exports = ProductController;