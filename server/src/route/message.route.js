const express = require('express');

const MessageRoute = express.Router();

const { totalUsers, particularUser, sendMessage, fetchMessages, notifications } = require('../controller/message.controller');

const authenticateUser = require('../middleware/auth.middleware');

MessageRoute.get('/totalUsers',authenticateUser, totalUsers);
MessageRoute.post('/particularUser',authenticateUser, particularUser);
MessageRoute.post('/sendMessage', authenticateUser, sendMessage);
MessageRoute.post('/fetchMessages', authenticateUser, fetchMessages);
MessageRoute.get('/notifications', authenticateUser, notifications);


module.exports = MessageRoute ;