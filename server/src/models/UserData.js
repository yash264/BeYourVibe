const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
})

const userData = new mongoose.model("user",userSchema);

module.exports = userData; 