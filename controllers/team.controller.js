const TeamModel = require('../models/tem.model');
const axios = require('axios');
const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

const getPlayers = async(req, res) =>{
    try {
        const response = await axios.get(`${BASE_URL}players?api_token=${API_KEY}`);
        const players = response.data.data;
    
        return res.status(200).json({player: players});
      } catch (error) {
        res.status(500).json({message:"Something went wrong!"});
      }
    

}

const saveTeam = async(req,res) =>{
    const userId = req.userId;
    try{
        if(!userId) return res.status(400).json({message:"User id is missing"});

        const teamData = req.body.data;

        const newTeam = new TeamModel(teamData);
        await newTeam.save();
        return res.status(200).json({ message: "team saved succesfully" });
        
    }catch(err){
        res.status(500).json({message:"Something went wrong!"});
    }
}
module.exports = {
    getPlayers,
    saveTeam
}