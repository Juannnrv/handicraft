const User = require("../model/userModel");
const JwtService = require("../middleware/jwtService");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

class UserController {
/**
 * Creates a user account.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user account is created.
 */
  static async createAccount(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        message: "Validation errors",
        data: errors.array(),
      });
    }

    const { username, password, email, gender, birthday } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        password: hashedPassword,
        email,
        gender,
        birthday,
      });
      res.status(201).json({
        status: 201,
        message: "User account created successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error creating user account",
      });
    }
  }

/**
 * Logs in a user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is logged in.
 */
  static async logIn(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        message: "Validation errors",
        data: errors.array(),
      });
    }

    const { identifier, password } = req.body;

    try {
      const user = await User.findOne({
        $or: [
          { email: identifier },
          { username: identifier },
          { phone: identifier },
        ],
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(404).json({
          status: 404,
          message: "Invalid identifier or password, please check and try again",
        });
      }

      const token = JwtService.generateToken({ _id: user._id });
      req.session.authToken = token;

      res.status(200).json({
        status: 200,
        message: "User logged in successfully",
        data: { token },
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error logging in user",
      });
    }
  }

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

    const { id } = req.params;
    const { profilePicture, username, email, phone, gender, birthday, password } =
      req.body;

    try {
      const user = await User.findByIdAndUpdate(
        id,
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
}

module.exports = UserController;
