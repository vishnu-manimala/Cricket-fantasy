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
      return res.status(500).json("Something went wrong!");
    }

    const isOtpSaved = sharedFunctions.saveOTP(user._id, otp);

    return res.status(200).json("Otp send successfully!");
  } catch (err) {
    res.status(500).json("Something went wrong");
  }
};



module.exports = {
  sendOtp,
  
};
