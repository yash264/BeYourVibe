const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    friends:{
        type:mongoose.Schema.Types.ObjectId,
        unique:true
    },
    personDetails: {
        type: Array
    },
    gender: {
        type: String
    },
    about: {
        type: String
    },
    proficePic: {
        type: String
    },
    homeTown: {
        type: String
    },
    password: {
        type: String
    },
})

const userData = new mongoose.model("user", userSchema);

module.exports = userData; 