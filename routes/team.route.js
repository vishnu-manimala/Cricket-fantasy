const express = require('express');
const teamRoutes = express();

const teamController = require('../controllers/team.controller');
const authMiddleware = require('../middlewares/auth.middleware');

teamRoutes.get('/getPlayers', authMiddleware.verifyAccessToken, teamController.getPlayers );
teamRoutes.post('/saveTeam', authMiddleware.verifyAccessToken, teamController.saveTeam );
module.exports = teamRoutes;