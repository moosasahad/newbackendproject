const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
    username:{type: String, required:true,trim:true},
    password:{type:String,required:true,trim:true},
    confirmpassword:{type:String,required:true,trim:true}
})

module.exports = mongoose.model("user",userschema)