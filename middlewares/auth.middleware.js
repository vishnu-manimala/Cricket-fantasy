const jwt = require('jsonwebtoken');
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const jwtModule = require('../utils/helper.jwt');

const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return verifyRefreshToken(req, res, next); 
          } else {
            return res.status(401).json({ message: 'Unauthorized' });
          }
        }
    
        req.userId = decoded.userId;
        next();
      });
  };

  const verifyRefreshToken = (req, res, next) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    jwt.verify(refreshToken, PRIVATE_KEY, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Refresh token expired" });
        } else {
          return res.status(400).json({ message: "Invalid refresh token" });
        }
      }

      const userId = decoded.userId;
      jwt.verify(refreshToken, PRIVATE_KEY, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        const newAccessToken = await jwtModule.tokenGenerator(userId);
        return res.json({ accessToken: newAccessToken });
      });
    });
  };


  
  module.exports = {
    verifyAccessToken
  }