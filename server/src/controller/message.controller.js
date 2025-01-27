const userData = require("../models/userData");
const conversationData = require("../models/conversationData");
const messageData = require("../models/messageData");
const io = require("../socket/server");
const { text } = require("express");


const totalUsers = async (req, res) => {
    try {
        const fetchUsers = await userData.find({ });

        res.status(201).json({
            success: true,
            data: "users list",
            message: fetchUsers,
        });
    }
    catch (error) {
        console.log(error);
    }
}


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
                $or:
                    [
                        {
                            sender: userId,
                            reciever: ifExists._id,
                        },
                        {
                            sender: ifExists._id,
                            reciever: userId,
                        }
                    ]
            },
        );

        if (friendExists) {
            res.status(201).json({
                success: true,
                value: "Friend Request Already Send",
                message: friendExists
            })
        }
        else {
            const friendRequest = new conversationData({
                sender: userId,
                reciever: ifExists._id,
                status: false
            })
            const conversation = await friendRequest.save();

            res.status(201).json({
                success: true,
                value: "friend request send",
                message: conversation
            })
        }
    }
    catch (error) {
        console.log(error);
    }
}

const totalRequests = async (req, res) => {
    try {
        const userId = req.user.id;

        const ifExists = await conversationData.find(
            {
                $or:
                    [
                        {
                            sender: userId,
                        },
                        {
                            reciever: userId,
                        }
                    ]
            },
        );

        if(ifExists){
            let requests = [];
            for(let i=0;i<ifExists.length;i++){
                let senderId ;

                if( ifExists[i].reciever === userId ){
                    senderId = ifExists[i].sender;
                }
                else if( ifExists[i].sender === userId ){
                    senderId = ifExists[i].reciever;
                }

                const senderDetails = await userData.find(
                    {
                        _id: senderId
                    }
                );

                if(senderDetails){
                    requests.push(senderDetails);
                }
            }
            res.status(201).json({
                success: true,
                data: "friend requests list",
                message: requests,
            });
        }
        else{
            res.json("no friend requests");
        }
    }
    catch (error) {
        console.log(error);
    }
}

const acceptRequest = async (req, res) => {
    try {

        const userId = req.user.id;

        const ifExists = await conversationData.findOne(
            {
                reciever: userId,
                status: false
            }
        );

        if (ifExists) {

            const chatExists = await messageData.findOne(
                {
                    refId: ifExists._id,
                }
            );

            if (!chatExists) {

                await conversationData.findByIdAndUpdate(
                    {
                        _id: ifExists._id,
                    },
                    {
                        status: true
                    }
                );

                const chatData = new messageData({
                    refId: ifExists._id,
                    createdAt: Date.now(),
                })
                const chatSchema = await chatData.save();

                res.status(201).json({
                    success: true,
                    value: "friend request accepted",
                    message: chatSchema
                })
            }
        }
        else {
            res.json("Already a friend");
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

        if (ifExists) {
            await messageData.findByIdAndUpdate(
                {
                    refId: ifExists._id
                },
                {
                    $push: {
                        chats:
                        {
                            userId: userId,
                            type: text,
                            value: req.body.message,
                            timeStamp: Date.now()
                        }
                    }
                }
            );
            res.status(201).json({
                success: true,
                value: "message send",
            })
        }
        else {
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

        if (ifExists) {
            const fetchChats = await messageData.findOne(
                {
                    refId: ifExists._id
                }
            );
            res.status(201).json({
                success: true,
                message: fetchChats,
            })
        }
        else {
            res.json("No chats Available");
        }
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = { totalUsers, sendRequest, totalRequests, acceptRequest, sendMessage, fetchMessages }