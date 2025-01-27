const express = require('express');

const MessageRoute = express.Router();

const { totalUsers, sendRequest, totalRequests, acceptRequest, sendMessage, fetchMessages } = require('../controller/message.controller');

const authenticateUser = require('../middleware/auth.middleware');

MessageRoute.get('/totalUsers', totalUsers);
MessageRoute.post('/sendRequest',authenticateUser, sendRequest);
MessageRoute.get('/totalRequests',authenticateUser, totalRequests);
MessageRoute.post('/acceptRequest', authenticateUser, acceptRequest);
MessageRoute.post('/sendMessage', authenticateUser, sendMessage);
MessageRoute.get('/fetchMessages', authenticateUser, fetchMessages);


module.exports = MessageRoute ;