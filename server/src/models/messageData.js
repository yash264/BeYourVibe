const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    createdAt:{
        type: Date,
        default: Date.now
    },
    sender:{
        type:String
    },
    reciever:{
        type:String
    },
    type:{
        type:String
    },
    value:{
        type:String
    },
    read:{
        type:Boolean
    },
})

const messageData = new mongoose.model("message",messageSchema);

module.exports = messageData; 