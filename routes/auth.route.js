const express = require('express');
const authRoutes = express();

const authController = require('../controllers/auth.controller');

authRoutes.post('/sendOtp', authController.sendOtp);


module.exports = authRoutes;