const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    gender:{
        type:String
    },
    password:{
        type:String
    },
})

const personData = new mongoose.model("user",personSchema);

module.exports = personData; 