const { validationResult } = require("express-validator");
const Order = require("../model/orderModel");
const User = require("../model/userModel");

class OrderController {
  /**
   * Creates a new order.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves when the order is created.
   * @throws {Error} - If there is an error creating the order.
   */
  static async createOrder(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { products, total, date, coupons } = req.body;
    const userId = req.user._id;

    const statuses = ["entregado", "pendiente", "enviado"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    const [day, month, year] = date.split("/");
    const formattedDate = new Date(`${year}-${month}-${day}`);

    try {
      const order = await Order.create({
        userId: userId,
        status: randomStatus,
        products: products,
        total: total,
        date: formattedDate,
        coupons: coupons,
      });

      await User.findByIdAndUpdate(
        userId,
        { $push: { purchases: order._id } },
        { new: true }
      );

      res.status(201).json({
        status: "201",
        message: "Order created successfully",
        data: order,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error creating user order",
        error: error.message,
      });
    }
  }

  /**
   * Retrieves all orders for a specific user.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves when the orders are retrieved successfully.
   */
  static async findAllOrders(req, res) {
    const userId = req.user._id;
    try {
      const orders = await Order.find({ userId: userId });
      res.status(200).json({
        status: 200,
        message: "Orders retrieved successfully",
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error retrieving orders",
      });
    }
  }
}

module.exports = OrderController;
