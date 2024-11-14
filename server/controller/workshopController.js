const Workshop = require("../model/workshopModel");
const { validationResult } = require("express-validator");

class workshopController {
  /**
   * List all workshops/products with pagination and filtering.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves when the products are listed.
   */
  static async listWorkshops(req, res) {
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
  static async viewWorkshop(req, res) {
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
        prueba:"?",
      });
    }
  }

    /**
   * Search workshops based on different criteria.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves when the workshops are listed.
   */
    static async searchWorkshops(req, res) {
      const { page = 1, limit = 10, name, description, searchTerm } = req.query;
      console.log("Search term:", searchTerm);
  
      try {
          // Construir los filtros basados en los parámetros de la consulta
          const filters = {};
  
          // Si se proporciona un término de búsqueda, lo usamos en una consulta de texto
          if (searchTerm) {
              // MongoDB text search
              filters.$text = { $search: searchTerm };
          }
  
          // Si se proporcionan filtros específicos, los aplicamos
          if (name) {
              filters.name = { $regex: name, $options: 'i' };  // Búsqueda por nombre con expresión regular (no sensible a mayúsculas/minúsculas)
          }
  
          if (description) {
              filters.description = { $regex: description, $options: 'i' };  // Búsqueda por descripción con expresión regular (no sensible a mayúsculas/minúsculas)
          }
  
          console.log("Search filters:", filters);  // Logueamos los filtros para asegurarnos que se están construyendo correctamente
  
          // Buscar los talleres según los filtros
          const workshops = await Workshop.find(filters)
              .skip((page - 1) * limit)
              .limit(parseInt(limit))
              .exec();
  
          // Contamos el número total de talleres con los mismos filtros
          const totalWorkshops = await Workshop.countDocuments(filters).exec();
  
          // Responder con los talleres encontrados
          res.status(200).json({
              status: 200,
              message: "Workshops fetched successfully",
              data: {
                  workshops,
                  total: totalWorkshops,
                  page: parseInt(page),
                  totalPages: Math.ceil(totalWorkshops / limit),
              },
          });
      } catch (error) {
          console.error("Error fetching workshops:", error);  // Logueamos el error detallado
  
          res.status(500).json({
              status: 500,
              message: "Error fetching workshops",
              error: error.message,  // Mostramos el mensaje de error específico
          });
      }
  }
}

module.exports = workshopController;
