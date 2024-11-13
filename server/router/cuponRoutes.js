const express = require('express');
const router = express.Router();
const CouponController = require('../controller/couponsController');
const { limit } = require("../middleware/limit");
const { versioning } = require("../middleware/versioning");

// Definir la ruta para obtener cupones
router.get('/search', limit('get'), versioning('1.0.0'), CouponController.getCoupons);

module.exports = router;
