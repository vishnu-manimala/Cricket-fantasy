const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
  name: 
  { 
    type: String, 
    required: true 
  },
  startDate: 
  { 
    type: Date, 
    required: true 
  },
  endDate: 
  { 
    type: Date 
  }, 
  format: 
  { 
    type: String, 
    required: true 
  }, 
  teams: 
  [
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team' 
    }
  ],
  winner: 
  { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Team' 
  },
  matches: 
  [
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Match' 
    }
  ], 
});