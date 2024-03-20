const express = require('express');
const authRoutes = express();

const authController = require('../controllers/auth.controller');

authRoutes.post('/sendOtp', authController.sendOtp);
authRoutes.post('/verify', authController.verifyOtp);
authRoutes.post('/reSendOtp', authController.resendOtp);

module.exports = authRoutes;