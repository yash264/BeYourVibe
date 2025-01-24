const mongoose = require("mongoose");
const personData = require("../models/UserData");
const jwt = require("jsonwebtoken");
//const { registrationMail } = require("../middleware/registrationMail"); 

const register = async (req, res) => {
    try {
        const ifExists = await personData.findOne({ email: req.body.email });
        if (ifExists) {
            res.status(201).json("Email Already Exists");
        }
        else {
            const registerPerson = new personData({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            const registered = await registerPerson.save();

            // to send the mail
            //registrationMail(req.body.name, req.body.email);

            res.status(201).json({
                success: true,
                message: "registered"
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const ifExists = await personData.findOne({ email: email })

        if (ifExists) {
            if (ifExists.password == password) {

                const token = jwt.sign(
                    { id:ifExists._id, name:ifExists.name, email:ifExists.email },
                    'jwt-secret-2k24',
                    { expiresIn: '30d'}
                );
                res.cookie('token',token,{
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                });
                res.json({
                    success: true,
                    token: token,
                    email: ifExists.email,
                    message: "success"
                });
            }
            else {
                res.json({message: "Incorrect Password"});
            }
        }
        else {
            res.json({message:"Please Register"});
        }
    }
    catch (error) {
        console.log(error);
    }
}

const verifyToken=async(req,res)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ valid: false,data:null});

    jwt.verify(token, 'jwt-secret-2k24', (err, decoded) => {
        if (err) return res.status(401).json({ valid: false ,data:null});
        return res.json({ valid: true ,data:decoded, message: "ok"});
    });
}

module.exports = { register, login, verifyToken}