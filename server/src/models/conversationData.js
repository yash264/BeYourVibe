const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    sender: {
        type: String
    },
    reciever: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    messages: {
        type: String,
    },
})

const conversationData = new mongoose.model("conversation", conversationSchema);

module.exports = conversationData; 