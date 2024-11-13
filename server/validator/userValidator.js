const { body, param } = require("express-validator");

const userValidator = {
  createAccount: [
    body("username")
      .optional()
      .notEmpty()
      .withMessage("Username is required")
      .isString()
      .withMessage("Username must be a string"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .isString()
      .withMessage("Password must be a string"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Email must be valid")
      .isString()
      .withMessage("Email must be a string"),
    body("phone").optional().isString().withMessage("Phone must be a string"),
    body("birthday")
      .isDate({ format: "MM/DD/YYYY" })
      .withMessage("Birthday must be a valid date in MM/DD/YYYY format"),
    body("gender")
      .optional()
      .isIn(["hombre", "mujer"])
      .withMessage("Gender must be hombre or mujer"),
  ],
  logIn: [
    body("username")
      .optional()
      .isString()
      .withMessage("Username must be a string"),
    body("phone").optional().isString().withMessage("Phone must be a string"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Email must be valid")
      .isString()
      .withMessage("Email must be a string"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isString()
      .withMessage("Password must be a string"),
  ],
  update: [
    body("profilePicture")
      .optional()
      .custom((value, { req }) => {
        if (!req.file || req.file.mimetype !== "image/png") {
          throw new Error("Profile Picture must be a PNG image");
        }
        return true;
      }),
    body("username")
      .optional()
      .isString()
      .withMessage("Username must be a string"),
    body("password")
      .optional()
      .isString()
      .withMessage("Password must be a string"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Email must be valid")
      .isString()
      .withMessage("Email must be a string"),
    body("phone").optional().isString().withMessage("Phone must be a string"),
    body("gender")
      .optional()
      .isIn(["hombre", "mujer"])
      .withMessage("Gender must be hombre or mujer"),
    body("birthday")
      .optional()
      .isDate({ format: "MM/DD/YYYY" })
      .withMessage("Birthday must be a valid date in MM/DD/YYYY format"),
  ],
};

module.exports = userValidator;
