const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const jwt = require("jsonwebtoken");

//const authenticateSocket = require('../middleware/socket.middleware');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
        credentials: true,
    }
});

io.use((socket, next) => {
    const token = socket.handshake.query['token']?.split(' ')[1];
    console.log(token);
    //const token = req.headers['authorization']?.split(' ')[1] ;

    if (!token) {
        return next(new Error("Authentication failed"));
    }

    try {
        const decoded = jwt.verify(token, 'jwt-secret-2k24');
        socket.user = decoded;
        //console.log(decoded);
        next();
    } catch (error) {
        return next(new Error("Authentication failed"));
    }
});

function middleware(data, next) {
    if (!data.title) {
        return next(new Error("Title is required!"));
    }
    next(); // Validation passed
}

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    //const userId = socket.handshake.query.token;
    //console.log(userId);

    socket.on("todo:create", (data, callback) => {
        middleware(data, (err) => {
            if (err) {
                return callback({ success: false, message: err.message });
            }
            console.log(socket.user);
            console.log(data);
            console.log("middleware connected"); // Proceed to the handler
        });
    });


    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

module.exports = { app, io, server };