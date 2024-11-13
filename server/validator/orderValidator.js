const { body } = require("express-validator");

const orderValidationRules = () => {
  return [
    body("products").isArray().withMessage("Products must be an array"),
    body("products.*.productId").isMongoId().withMessage("Invalid product ID"),
    body("products.*.quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
    body("products.*.price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("total")
      .isFloat({ min: 0 })
      .withMessage("Total must be a positive number"),
    body("date")
      .matches(/^\d{2}\/\d{2}\/\d{4}$/)
      .withMessage("Order date must be a valid date in DD/MM/YYYY format"),
    body("status")
      .optional()
      .isIn(["pendiente", "procesado", "enviado", "entregado", "cancelado"])
      .withMessage("Invalid status"),
    body("coupons")
      .optional()
      .isArray()
      .withMessage("Coupons must be an array"),
    body("coupons.*").optional().isMongoId().withMessage("Invalid coupon ID"),
  ];
};

module.exports = {
  orderValidationRules,
};
