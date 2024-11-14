const express = require('express');
const {
  updateUser, findUserFavorites, createUserFavorite, findUserById, findUserCoupons, findUserOrders, findUserWorkshopEnrollments, deleteUserFavorite
} = require('../controller/userController');
const userValidator = require('../validator/userValidator');
const { versioning } = require('../middleware/versioning');
const { limit } = require('../middleware/limit');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const user = express.Router();

user.post('/favorites', versioning('1.0.0'), createUserFavorite);
user.get('/', limit('get'), versioning('1.0.0'), findUserById);
user.get('/favorites', versioning('1.0.0'), findUserFavorites);
user.get('/coupons', versioning('1.0.0'), findUserCoupons);
user.get('/orders', versioning('1.0.0'), findUserOrders);
user.get('/workshops', versioning('1.0.0'), findUserWorkshopEnrollments);
user.put('/', upload.single('profilePicture'), limit('put'), versioning('1.0.0'), userValidator.update, updateUser);
user.delete('/favorites/:id', versioning('1.0.0'), deleteUserFavorite);

module.exports = user;