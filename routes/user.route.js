const express = require('express');
const userRoutes = express();

const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

userRoutes.post('/getUser', authMiddleware.verifyAccessToken, userController.getUser );

module.exports = userRoutes;