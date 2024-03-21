const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const otplib = require('otplib');

require("dotenv").config();
const port = process.env.PORT;

const connect = require("./database/db.mongoose");
connect();

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const walletRoutes = require('./routes/wallet.route');
const teamRoutes = require('./routes/team.route')
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/wallet', walletRoutes);
app.use('/team', teamRoutes)

const server = app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
  });