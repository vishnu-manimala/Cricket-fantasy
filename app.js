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

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const server = app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
  });