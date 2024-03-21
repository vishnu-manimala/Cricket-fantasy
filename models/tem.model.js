const mongoose = require('mongoose');
const User = require('./user.model');
const Contest = require('./contest.model');

const teamSchema = new mongoose.Schema({
  
  name: 
  { 
    type: String, 
    required: true 
  },
  logo: 
  { 
    type: String 
  }, 
  user_id: 
  { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  contest_id: 
  { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Contest' 
  },
  players: 
  [
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
  ], 
  external_id: 
  { 
    type: String 
  }, 
  country: 
  { 
    type: String 
  }, 
});

module.exports = mongoose.model('Team', teamSchema);