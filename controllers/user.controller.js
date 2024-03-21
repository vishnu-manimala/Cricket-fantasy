const UserModel = require('../models/user.model');

const getUser = async(req,res) =>{
    const userId = req.userId;

    try{

        if(!userId) return res.status(400).json({message:"User id is missing"});

        const userData = await UserModel.findById(userId);
        if(!userData) return res.status(404).json({ message: "User data not found!" });

        return res.status(200).json({user: userData});

    }catch(err){
        return res.status(500).json({message:"Something went wrong"});
    }
}

module.exports = {
    getUser
}