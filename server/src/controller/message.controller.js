const userData = require("../models/userData");
const conversationData = require("../models/conversationData");
const messageData = require("../models/messageData");
const io = require("../socket/server");

const sendRequest = async (req, res) => {
    try {
    
        const userId = req.user.id;
        const ifExists = await userData.findOne(
            {
                email: req.body.email,
            }
        ); 

        const friendExists = await conversationData.findOne(
            {
                sender: userId,
                reciever: ifExists._id,
            }
        );

        if(friendExists){
            res.status(201).json("Friend Request Already Send");
        }
        else{
            const friendRequest = new conversationData({
                sender: userId,
                reciever: ifExists._id,
                status: false
            })
            const conversation = await friendRequest.save();
            const conversationId = conversation._id;
    
            await userData.findByIdAndUpdate(
                {
                    _id: userId
                },
                {
                    $push: {
                        friends: conversationId
                    }
                }
            );
    
            res.status(201).json({
                success: true,
                value: "friend request send",
            })
        }
    }
    catch (error) {
        console.log(error);
    }
}

const acceptRequest = async (req, res) => {
    try {

        const userId = req.user.id ;
        const recieverId = await userData.findOne({email: req.body.email});

        const ifExists = await conversationData.findOne(
            { 
                sender: userId,
                reciever: recieverId._id,
                status: false
            }
        ); 

        if(ifExists){

            const chatExists = await messageData.findOne(
                { 
                    refId: ifExists._id,
                }
            );

            if(!chatExists){
                await userData.findByIdAndUpdate(
                    {
                        _id: userId
                    },
                    {
                        $push: {
                            friends: ifExists._id
                        }
                    }
                );

                const chatData = new messageData({
                    refId: ifExists._id,
                    createdAt: Date.now(),
                })
                const chatSchema = await chatData.save();
                const chatSchemaId = chatSchema._id;

                await conversationData.findByIdAndUpdate(
                    {
                        _id: ifExists._id
                    },
                    {
                        status: true, 
                        $push: {
                            messages: chatSchemaId
                        }
                    }
                );
        
                res.status(201).json({
                    success: true,
                    value: "friend request accepted",
                })
            }
            else{
                res.json("Already a friend");
            }

        }

    }
    catch (error) {
        console.log(error);
    }
}

const sendMessage = async (req, res) => {
    try {
    
        const userId = req.user.id;
        const recieverId = await userData.findOne({ email: req.body.email });

        const ifExists = await conversationData.findOne(
            {  
                sender: userId,  
                reciever: recieverId._id,
                status: true
            }
        ); 

        if(ifExists){
            await messageData.findByIdAndUpdate(
                {
                    _id: ifExists.messages
                },
                {
                    $push: {
                        chats: 
                        {
                            userId: userId,
                            value: req.body.message,
                        } 
                    }
                }
            );
            res.status(201).json({
                success: true,
                value: "message send",
            })
        }
        else{
            res.json("First Send friend request");
        }
    }
    catch (error) {
        console.log(error);
    }
}

const fetchMessages = async (req, res) => {
    try {
    
        const userId = req.user.id;
        const recieverId = await userData.findOne({ email: req.body.email });

        const ifExists = await conversationData.findOne(
            { 
                sender: userId,   
                reciever: recieverId._id,
                status: true
            }
        ); 

        if(ifExists){
            const fetchChats = await messageData.findOne(
                {
                    _id: ifExists.messages
                }
            );
            res.status(201).json({
                success: true,
                message: fetchChats,
            })
        }
        else{
            res.json("No chats Available");
        }
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = { sendRequest, acceptRequest, sendMessage, fetchMessages }