const express = require('express');
const {
  createAccount,
  logIn,
  updateUser,
  findUserFavorites,
  createUserFavorite,
  findUserById,
  findUserCoupons,
  findUserOrders,
  findUserWorkshopEnrollments,
  deleteUserFavorite
} = require('../controller/userController');
const userValidator = require('../validator/userValidator');
const { versioning } = require('../middleware/versioning');
const { limit } = require('../middleware/limit');
const verifyJwt = require('../middleware/authJwt');
const user = express.Router();

user.post('/create', limit('post'), versioning('1.0.0'), userValidator.createAccount, createAccount);
user.post('/login', versioning('1.0.0'), userValidator.logIn, logIn);
user.post('/favorites', verifyJwt, limit('post'), versioning('1.0.0'), createUserFavorite);
user.get('/', verifyJwt, limit('get'), versioning('1.0.0'), findUserById);
user.get('/favorites', verifyJwt, limit('get'), versioning('1.0.0'), findUserFavorites);
user.get('/coupons', verifyJwt, limit('get'), versioning('1.0.0'), findUserCoupons);
user.get('/orders', verifyJwt, limit('get'), versioning('1.0.0'), findUserOrders);
user.get('/workshop', verifyJwt, limit('get'), versioning('1.0.0'), findUserWorkshopEnrollments);
user.put('/', verifyJwt, limit('put'), versioning('1.0.0'), userValidator.update, updateUser);
user.delete('/favorites/:id', verifyJwt, limit('delete'), versioning('1.0.0'), deleteUserFavorite);

module.exports = user;