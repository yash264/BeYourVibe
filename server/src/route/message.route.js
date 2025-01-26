const express = require('express');

const MessageRoute = express.Router();

const { sendRequest, acceptRequest, sendMessage, fetchMessages } = require('../controller/message.controller');

const authenticateUser = require('../middleware/auth.middleware');

MessageRoute.post('/sendRequest',authenticateUser, sendRequest);
MessageRoute.post('/acceptRequest', authenticateUser, acceptRequest);
MessageRoute.post('/sendMessage', authenticateUser, sendMessage);
MessageRoute.get('/fetchMessages', authenticateUser, fetchMessages);


module.exports = MessageRoute ;