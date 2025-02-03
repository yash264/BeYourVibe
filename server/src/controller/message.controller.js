const mongoose = require("mongoose");
const userData = require("../models/userData");
const conversationData = require("../models/conversationData");
const messageData = require("../models/messageData");
const io = require("../socket/server");
const { text } = require("express");


const totalUsers = async (req, res) => {
    try {
        const userId = req.user.id;
        const ObjectId = mongoose.Types.ObjectId;
        const fetchUsers = await userData.find(
            {
                _id:
                {
                    $ne: new ObjectId(userId)
                }
            }
        );


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

const particularUser = async (req, res) => {
    try {
        const email = req.body.email;

        const ifExists = await userData.findOne(
            {
                email: email
            }
        );

        res.status(201).json({
            success: true,
            data: "particular user",
            message: ifExists,
        });
    }
    catch (error) {
        console.log(error);
    }
}

const sendMessage = async (req, res) => {
    try {

        const userId = req.user.id;
        const recieverId = await userData.findOne({ email: req.body.email });


        const conversation = new messageData({
            sender: userId,
            reciever: recieverId._id,
            type: req.body.text,
            value: req.body.message,
            read: false,
            timeStamp: Date.now()
        })
        const messageDetails = await conversation.save();

        res.status(201).json({
            success: true,
            value: "message send",
        })
    }
    catch (error) {
        console.log(error);
    }
}

const fetchMessages = async (req, res) => {
    try {

        const userId = req.user.id;
        const recieverId = await userData.findOne({ email: req.body.email });

        const ifExists = await messageData.find(
            {
                $or: [
                    {
                        sender: userId,
                        reciever: recieverId._id,
                    },
                    {
                        sender: recieverId._id,
                        reciever: userId,
                    }
                ]
            }
        );

        if (ifExists) {

            for(let i=0;i<ifExists.length;i++){
                await messageData.updateMany(
                    {
                        _id: ifExists[i]._id,
                        reciever: userId,
                    },
                    {
                        read: true
                    }
                );
            }

            res.status(201).json({
                success: true,
                message: ifExists,
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

const notifications = async (req, res) => {
    try {

        const userId = req.user.id;
        const ObjectId = mongoose.Types.ObjectId;

        const ifExists = await messageData.find(
            {
                reciever: new ObjectId(userId),
                read: false
            }
        );

        if (ifExists) {

            let messageList = [];
            for(let i=0;i<ifExists.length;i++){
                const userDetail = await userData.findOne(
                    {
                        _id: ifExists[i].sender,
                    }
                );
                messageList.push(userDetail);
            }

            res.status(201).json({
                success: true,
                message: messageList,
            })
        }
        else {
            res.json("No notification");
        }
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = { totalUsers, particularUser, sendMessage, fetchMessages, notifications }