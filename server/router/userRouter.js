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

user.post('/favorites', limit('post'), versioning('1.0.0'), createUserFavorite);
user.get('/', limit('get'), versioning('1.0.0'), findUserById);
user.get('/favorites', limit('get'), versioning('1.0.0'), findUserFavorites);
user.get('/coupons', limit('get'), versioning('1.0.0'), findUserCoupons);
user.get('/orders', limit('get'), versioning('1.0.0'), findUserOrders);
user.put('/', upload.single('profilePicture'), limit('put'), versioning('1.0.0'), userValidator.update, updateUser);
user.delete('/favorites/:id', limit('delete'), versioning('1.0.0'), deleteUserFavorite);

module.exports = user;