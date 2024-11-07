const express = require('express');
const {
  updateUser,
  findUserFavorites,
  createUserFavorite,
  findUser,
  findUserCoupons,
  findUserOrders,
  findUserWorkshopEnrollments,
  deleteUserFavorite
} = require('../controller/userController');
const userValidator = require('../validator/userValidator');
const { versioning } = require('../middleware/versioning');
const { limit } = require('../middleware/limit');
const user = express.Router();

user.post('/favorites', limit('post'), versioning('1.0.0'), createUserFavorite);
user.get('/', limit('get'), versioning('1.0.0'), findUser);
user.get('/favorites', limit('get'), versioning('1.0.0'), findUserFavorites);
user.get('/coupons', limit('get'), versioning('1.0.0'), findUserCoupons);
user.get('/orders', limit('get'), versioning('1.0.0'), findUserOrders);
user.get('/workshops', limit('get'), versioning('1.0.0'), findUserWorkshopEnrollments);
user.put('/', limit('put'), versioning('1.0.0'), userValidator.update, updateUser);
user.delete('/favorites/:id', limit('delete'), versioning('1.0.0'), deleteUserFavorite);

module.exports = user;