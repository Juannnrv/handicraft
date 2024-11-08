const User = require("../model/userModel");
const Workshop = require("../model/workshopModel");
const Product = require("../model/productModel");
const Order = require("../model/orderModel");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

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

    const {
      profilePicture,
      username,
      email,
      phone,
      gender,
      birthday,
      password,
    } = req.body;

    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { profilePicture, username, email, phone, gender, birthday },
        { new: true }
      );

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
  static async findUser(req, res) {
    const userId = req.user._id;

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
      const user = await User.findById(userId).populate("favorites");

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
      });
    }
  }

  /**
   * Creates a user favorite.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves with the user's favorites data or rejects with an error.
   */
  static async createUserFavorite(req, res) {
    const userId = req.user._id;
    const { favoriteId } = req.body;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }

      const [productFavorite, workshopFavorite] = await Promise.all([
        Product.findById(favoriteId),
        Workshop.findById(favoriteId),
      ]);

      if (!productFavorite && !workshopFavorite) {
        return res.status(404).json({
          status: 404,
          message: "Product or Workshop not found",
        });
      }

      if (productFavorite) {
        if (!user.favorites.products) {
          user.favorites.products = [];
        }
        if (user.favorites.products.includes(favoriteId)) {
          return res.status(400).json({
            status: 400,
            message: "Product already in favorites",
          });
        }
        user.favorites.products.push(favoriteId);
      } else if (workshopFavorite) {
        if (!user.favorites.workshops) {
          user.favorites.workshops = [];
        }
        if (user.favorites.workshops.includes(favoriteId)) {
          return res.status(400).json({
            status: 400,
            message: "Workshop already in favorites",
          });
        }
        user.favorites.workshops.push(favoriteId);
      }

      await user.save();
      await user.populate("favorites.products favorites.workshops");

      return res.status(200).json({
        status: 200,
        message: "User favorite added",
        data: user.favorites,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error adding user favorite",
        error: error.message,
      });
    }
  }

  /**
   * Deletes a user's favorite product or workshop.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The response object with status, message, and data properties.
   * @throws {Object} The response object with status, message, and error properties if an error occurs.
   */
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
  
      const favorite = await Product.findById(objectId) || await Workshop.findById(objectId);
  
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
        error: error.message,
      });
    }
  }

  /**
   * Finds the orders made by a user.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves with the user's orders or an error message.
   */
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
        message: "User purchases found",
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error finding user purchases",
        error: error.message,
      });
    }
  }

  /**
   * Retrieves the workshop enrollments of a user.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves with the workshop enrollments of the user or an error message.
   */
  static async findUserWorkshopEnrollments(req, res) {
    const userId = req.user._id;

    try {
      const user = await User.findById(userId).populate("workshopsEnrolled");

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }

      if (user.workshopsEnrolled.length === 0) {
        return res.status(200).json({
          status: 200,
          message: "User has not enrolled in any workshops",
          data: [],
        });
      }

      res.status(200).json({
        status: 200,
        message: "User workshop enrollments found",
        data: user.workshopsEnrolled,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error finding user workshop enrollments",
        error: error.message
      });
    }
  }

  /**
   * Retrieves the coupons associated with a user.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves when the coupons are retrieved.
   */
  static async findUserCoupons(req, res) {
    const userId = req.user._id;

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
        error: error.message
      });
    }
  }
}

module.exports = UserController;
