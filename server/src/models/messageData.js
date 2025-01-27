const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    createdAt:{
        type: Date,
        default: Date.now
    },
    refId:{
        type:String
    },
    chats:{
        type:Array
    },
    userId:{
        type:String
    },
    type:{
        type:String
    },
    value:{
        type:String
    },
    timestamp : {
        type: Date,
    },
})

const messageData = new mongoose.model("message",messageSchema);

module.exports = messageData; 