const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  series_id: 
  { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Series' 
  }, 
  date: 
  { 
    type: Date, 
    required: true 
  }, 
  time: 
  { 
    type: String, 
    required: true 
  }, 
  venue: 
  { 
    type: String, 
    required: true 
  }, 
  toss: {  
    winner: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team' 
    },
    elected: 
    { 
        type: String, 
        required: true 
    } 
  },
  team1: 
  { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Team' 
  }, 
  team2: 
  { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Team' 
  }, 
  result: 
  {   
    winner: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team' 
    }, 
    margin: 
    { 
        type: String 
    }, 
  },
  scoreboard: {  
    team1: {
      score: { type: Number },
      wickets: { type: Number },
      overs: { type: Number }
    },
    team2: {
      score: { type: Number },
      wickets: { type: Number },
      overs: { type: Number }
    }
  }
});

module.exports = mongoose.model('Match', matchSchema);