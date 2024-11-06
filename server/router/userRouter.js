const express = require('express');
const { createAccount, logIn, updateUser } = require('../controller/userController');
const userValidator = require('../validator/userValidator');
const { versioning } = require('../middleware/versioning');
const { limit } = require('../middleware/limit');
const verifyJwt = require('../middleware/authJwt');
const user = express.Router();  

user.post('/create', limit('post', '/create'), versioning('1.0.0'), userValidator.createAccount, createAccount);
user.post('/login', limit('login', '/login'), versioning('1.0.0'), userValidator.logIn, logIn);
user.put('/update/:id', verifyJwt, limit('put', '/update'), versioning('1.0.0'), userValidator.update, updateUser);

module.exports = user;
