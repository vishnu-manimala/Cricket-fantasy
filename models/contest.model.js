const mongoose = require('mongoose');
const Macth = require('./matches.model');
const User = require('./user.model');

const contestSchema = new mongoose.Schema({
    name: 
    {   
        type: String, 
        required: true 
    },
    entryFee: 
    { 
        type: Number, 
        required: true 
    },
    totalSpots: 
    { 
        type: Number, 
        required: true 
    },
    filledSpots: 
    { 
        type: Number, 
        default: 0 
    },
    prizePool: 
    { 
        type: Number, 
        required: true 
    },
    prizeBreakup: 
    [
        { 
            type: Object, 
            required: true 
        }
    ],
    matchId: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Match' 
    },
    type: 
    { 
        type: String, 
        required: true 
    }, 
    startTime: 
    { 
        type: Date, 
        required: true 
    }, 
    endTime: 
    { 
        type: Date, 
        required: true 
    }, 
    joinedUsers: 
    [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ], 
    winner: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }, 
  });

  module.exports = mongoose.model('Contest', contestSchema);