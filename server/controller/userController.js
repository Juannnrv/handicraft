const User = require("../model/userModel");
const Workshop = require("../model/workshopModel");
const Product = require("../model/productModel");
const Order = require("../model/orderModel");
const ProfileImg = require("../middleware/profileImage");
const { validationResult } = require("express-validator");
const mongoose = require('mongoose');
const UserService = require('../middleware/profileImage');

class UserController {
  /**
   * Updates a user account.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves when the user account is updated.
   */
  static async updateUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        message: "Validation errors",
        data: errors.array(),
      });
    }

    const userId = req.user._id;
    const { username, email, phone, gender, birthday, password } = req.body;

    try {
      const updateData = { username, email, phone, gender, birthday };
      const user = await ProfileImg.updateUser(userId, updateData, req.file?.path);

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }

      res.status(200).json({
        status: 200,
        message: "User account updated successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error updating user account",
        error: error.message
      });
    }
  }

  /**
   * Finds a user by their ID.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves when the user is found or an error occurs.
   */
  static async findUserById(req, res) {
    const userId = req.user._id

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }

      res.status(200).json({
        status: 200,
        message: "User found",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error finding user",
      });
    }
  }

  /**
   * Finds the favorites of a user.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves when the favorites are found.
   */
  static async findUserFavorites(req, res) {
    const userId = req.user._id;

    try {
      const user = await User.findById(userId)
        .populate({
          path: 'favorites.products',
          model: 'Product'
        })
        .populate({
          path: 'favorites.workshops',
          model: 'Workshop'
        });

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }

      res.status(200).json({
        status: 200,
        message: "User favorites found",
        data: user.favorites,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error finding user favorites",
        error: error.message,
      });
    }
  }

  static async createUserFavorite(req, res) {
    const userId = req.user._id;  // El ID del usuario actual
    const { favoriteId } = req.body;  // El ID del favorito (puede ser producto o taller)
  
    try {
      // Buscar al usuario por ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }
  
      // Buscar si el favorito es un producto o un taller
      const [productFavorite, workshopFavorite] = await Promise.all([
        Product.findById(favoriteId),
        Workshop.findById(favoriteId),
      ]);
  
      // Verificar que al menos uno exista
      if (!productFavorite && !workshopFavorite) {
        return res.status(404).json({
          status: 404,
          message: "Product or Workshop not found",
        });
      }
  
      // Lógica para agregar un producto favorito
      if (productFavorite) {
        if (!user.favorites.products) {
          user.favorites.products = [];  // Si no existe la lista de productos favoritos, la creamos
        }
        user.favorites.products.push(new mongoose.Types.ObjectId(favoriteId));  // Asegúrate de usar un ObjectId válido
        await user.save();
        // await user.populate("favorites.products").execPopulate();  // Poblar los productos favoritos
  
        return res.status(200).json({
          status: 200,
          message: "User product favorite added",
          data: user.favorites.products,
        });
      }
  
      // Lógica para agregar un taller favorito
      if (workshopFavorite) {
        if (!user.favorites.workshops) {
          user.favorites.workshops = [];  // Si no existe la lista de talleres favoritos, la creamos
        }
        user.favorites.workshops.push(new mongoose.Types.ObjectId(favoriteId));  // Asegúrate de usar un ObjectId válido
        await user.save();
        // await user.populate("favorites.workshops").execPopulate();  // Poblar los talleres favoritos
  
        return res.status(200).json({
          status: 200,
          message: "User workshop favorite added",
          data: user.favorites.workshops,
        });
      }
  
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error adding user favorite",
        error: error.message,
      });
    }
  }

  static async deleteUserFavorite(req, res) {
    const { id } = req.params;
    const userId = req.user._id;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }

      const objectId = new mongoose.Types.ObjectId(id);

      const favorite =
        (await Product.findById(objectId)) ||
        (await Workshop.findById(objectId));

      if (!favorite) {
        return res.status(404).json({
          status: 404,
          message: "Product or Workshop not found",
        });
      }

      user.favorites.products = user.favorites.products.filter(
        (product) => product.toString() !== id
      );
      user.favorites.workshops = user.favorites.workshops.filter(
        (workshop) => workshop.toString() !== id
      );

      await user.save();
      await user.populate("favorites.products favorites.workshops");

      return res.status(200).json({
        status: 200,
        message: "User favorite deleted",
        data: user.favorites,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error deleting user favorite",
      });
    }
  }

  static async findUserOrders(req, res) {
    const userId = req.user._id;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }

      if (user.purchases.length === 0) {
        return res.status(200).json({
          status: 200,
          message: "User has not made any purchases",
          data: [],
        });
      }

      const orders = await Order.find({ _id: { $in: user.purchases } });

      res.status(200).json({
        status: 200,
        message: "User orders found",
        data: user.orders,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error finding user orders",
      });
    }
  }

  static async findUserCoupons(req, res) {
    const userId = req.user._id

    try {
      const user = await User.findById(userId).populate("coupons");

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }

      if (user.coupons.length === 0) {
        return res.status(200).json({
          status: 200,
          message: "User has no coupons",
          data: [],
        });
      }

      res.status(200).json({
        status: 200,
        message: "User coupons found",
        data: user.coupons,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error finding user coupons",
        error: error.message,
      });
    }
  }
}

module.exports = UserController;
