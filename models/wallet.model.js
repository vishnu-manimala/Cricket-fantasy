const mongoose = require('mongoose');
const User = require('./user.model');
const Transaction = require('./transaction.model');

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  },
  deposit: {
    type: Number,
    required: true,
    default: 0 
  },
  winning: {
    type: Number,
    required: true,
    default: 0 
  },
  bonus: {
    type: Number,
    required: true,
    default: 0
  },
  transactionHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction' 
  }]
});

module.exports = mongoose.model('Wallet', walletSchema);