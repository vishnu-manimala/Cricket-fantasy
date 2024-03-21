const express = require('express');
const walletRoutes = express();

const walletController = require('../controllers/wallet.controller');
const authMiddleware = require('../middlewares/auth.middleware');

walletRoutes.post('/getWalletData', authMiddleware.verifyAccessToken, walletController.getWalletData );
walletRoutes.post('/getBalance', authMiddleware.verifyAccessToken, walletController.getBalance );
module.exports = walletRoutes;