const express = require("express");
const app = express();
const PORT = require("port")
const port = 4000;
const cors = require("cors");
require("./db/connection");

const UserRoute = require("./route/UserRoute");

const corsOptions ={
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api", UserRoute)

app.listen(port , () => {
    console.log(`Server is running at ${port}`);
}) 