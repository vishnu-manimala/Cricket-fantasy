const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const userModel = require("./user.model");

const otpSchema = new mongoose.Schema({
    userId : {
        type: ObjectId,
        ref : userModel,
        require: true
    },
    otp : {
        type: Number,
        require: true
    },
    phone:{
        type:Number,
        require: true
    }
}, { timestamps: true });

module.exports = mongoose.model('otp',otpSchema);