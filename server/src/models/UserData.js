const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    email:{
        type:String
    },
    personDetails:{
        type:Array
    },
    name:{
        type:String
    },
    gender:{
        type:String
    },
    about:{
        type:String
    },
    proficePic:{
        type:String
    },
    homeTown:{
        type:String
    },
    password:{
        type:String
    },
})

const userData = new mongoose.model("user",userSchema);

module.exports = userData; 