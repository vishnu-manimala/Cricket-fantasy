const otplib = require("otplib");
const twilioClient = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const Otp = require("../models/otp.model");

const generateOTP = () => {
  return otplib.authenticator.generate(4);
};

const twilio = async (otp, phone) => {
  try {
    await twilio.messages
      .create({
        body: otp,
        to: `+91${phone}`,
        from: "+16185076078",
      })
      .then((message) => {
        return "success";
      });
  } catch (err) {
    return err.message;
  }
};

const saveOTP = async (userId, otp) => {
  try {
    const newOTP = new Otp({ user_id: userId, otp: hashedOTP });
    await newOTP.save();
    return "success";
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  generateOTP,
  twilio,
  saveOTP
};
