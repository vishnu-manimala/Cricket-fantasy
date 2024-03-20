const sharedFunctions = require("../utils/helper.functions");
const UserModel = require("../models/user.model");
const OtpModel = require('../models/otp.model') 


const sendOtp = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    if (!phoneNumber) {
      return res.status(400).json({ message: "Missing phone number" });
    }

    const user = await UserModel.findOne({ mobileNumber: phoneNumber });

    if (!user) {
      return res.status(401).json({ message: "User not registered!" });
    }

    const otp = sharedFunctions.generateOTP();
    const sendMessage = await sharedFunctions.twilio(otp, phoneNumber);

    if (sendMessage !== "success") {
      return res.status(500).json({message:"Something went wrong!"});
    }

    const isOtpSaved = sharedFunctions.saveOTP(user._id, otp);

    return res.status(200).json({message: "Otp send successfully!"});
  } catch (err) {
    res.status(500).json({message:"Something went wrong!"});
  }
};

const verifyOtp = async (req, res) => {
    const { phoneNumber, otp } = req.body;
  
    try {
  
      if (!phoneNumber) {
        return res.status(400).json({ message: "Missing phone number " });
      }
  
      if (!otp) {
        return res.status(400).json({ message: "Missing  OTP" });
      }
  
      const userOtp = await OtpModel.findOne({phone:phoneNumber, otp:otp});

      if(!userOtp){
        return res.status(401).json({ message:  'Invalid OTP' });
      }
      const currentDate = new Date();
      if (userOtp.updatedAt < currentDate) {
        return res.status(401).json({ message:  ' OTP expired' });
      }
  
      res.status(200).json({ message: 'OTP verified successfully' });
      await OtpModel.deleteOne({phone: phoneNumber});

    } catch (err) {

      res.status(500).json({ message: "Something went wrong"});
    }
  };

  const resendOtp = async (req, res) => {
    const { phoneNumber } = req.body;
    try {
      if (!phoneNumber) {
        return res.status(400).json({ message: "Missing phone number" });
      }

      const otp = sharedFunctions.generateOTP();
      const sendMessage = await sharedFunctions.twilio(otp, phoneNumber);
      if (sendMessage !== "success") {
        return res.status(500).json({ message: "Something went wrong!" });
      }
      return res.status(200).json({message: "Otp send successfully!"});

      const OtpSaved = await OtpModel.findOneAndUpdate(
        { phone: phoneNumber },
        { $set: { otp: otp } }
      );
      
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
module.exports = {
  sendOtp,
  verifyOtp,
  resendOtp
};
