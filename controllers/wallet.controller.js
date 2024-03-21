const UserModel = require("../models/user.model");
const OtpModel = require("../models/otp.model");
const WalletModel = require("../models/wallet.model");
const sharedFunctions = require("../utils/helper.functions");
const walletModel = require("../models/wallet.model");

const getWalletData = async (req, res) => {
  const userId = req.userId;
  try {
    if (!userId) return res.status(400).json({ message: "User id is missing" });

    const walletData = await walletModel.findOne({ userId: userId });
    if (!walletData)
      return res.status(404).json({ message: "Wallet data not found!" });
    return res.status(200).json({ wallet: walletData });
  } catch (err) {
    return res.status(500).json({message:"Something went wrong"});
  }
};

const getBalance =  async(req,res) => {
    const userId = req.userId;
    try {
      if (!userId) return res.status(400).json({ message: "User id is missing" });
  
      const balance = await walletModel.findOne({ userId: userId },{balance:1, _id:0});
      if (!balance)
        return res.status(404).json({ message: "balance data not found!" });
      return res.status(200).json({ balance: balance });
    } catch (err) {
      return res.status(500).json({message:"Something went wrong"});
    }
}

const addCash = async(req,res) =>{
    const userId = req.userId;

    try{
        if (!userId) return res.status(400).json({ message: "User  is missing" });
        const amount = req.body.amount;
        if (!amount) return res.status(400).json({ message: "Amount  is missing" });
        const wallet = await WalletModel.findOneAndUpdate({userId:userId}, {
          $inc: { balance: amount } 
        }, { new: true });
        if (!amount) return res.status(400).json({ message: "Wallet not found" });
        return res.status(200).json({ balance: wallet.balance, message:'Cash added' });
    }catch(err){
        return res.status(500).json({message:"Something went wrong"});
    }
}
module.exports = {
    getWalletData,
    getBalance,
    addCash
}
