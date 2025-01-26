const express = require("express");
const PORT = require("port")
const port = 4000;
const cors = require("cors");

const { app, server } = require("./socket/server");
require("./db/connection");

const UserRoute = require("./route/user.route");
const MessageRoute = require("./route/message.route");

const corsOptions ={
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api", UserRoute)
app.use("/api", MessageRoute)

server.listen(port , () => {
    console.log(`Server is running at ${port}`);
}) 