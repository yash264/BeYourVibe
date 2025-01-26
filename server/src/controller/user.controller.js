const userData = require("../models/userData");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const { verifyEmail } = require("../middleware/verifyEmail"); 

const otpStore = {};

const verifyUser = async (req, res) => {
    try {
        const ifExists = await userData.findOne({ email: req.body.email });
        if (ifExists) {
            res.status(201).json("Email must be Unique");
        }
        else {
            const otp = otpGenerator.generate(6, 
                { 
                    lowerCaseAlphabets: false,
                    upperCaseAlphabets: false,
                    specialChars: false 
                }
            );

            //  to send the mail
            verifyEmail(req.body.email, req.body.name, otp);

            otpStore[req.body.email] = otp;

            res.status(201).json({
                success: true,
                message: "otp send"
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


const register = async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const otp = req.body.verificationCode;

        const ifExists = await userData.findOne({ email: email });
        if (ifExists) {
            res.status(201).json("Email Already Exists");
        }
        else if (otpStore[email] === otp){

            const registerPerson = new userData({
                name: name,
                email: email,
                password: password
            })
            const registered = await registerPerson.save();

            delete otpStore[email];

            // to send the mail
            //registrationMail(req.body.name, req.body.email);

            res.status(201).json({
                success: true,
                message: registered
            });
        }
        else if (otpStore[email] !== otp){

            res.status(201).json({
                success: false,
                message: "invalid otp"
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
        const ifExists = await userData.findOne({ email: email })

        if (ifExists) {
            if (ifExists.password == password) {

                const token = jwt.sign(
                    { id:ifExists._id, name: ifExists.name, email:ifExists.email },
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

const fetchUser = async (req, res) => {
    try {
        const fetchUserData = await userData.findOne(
            {
                _id: req.user.id,
                email: req.user.email
            },
        );
        
        res.status(201).json({
            success: true,
            data: "user profile",
            message: fetchUserData,
        });
    }
    catch (error) {
        console.log(error);
    }
}

const updateUser = async (req, res) => {
    try {
        const personDetail = await userData.updateOne(
            {
                _id:req.user.id,
                email:req.user.email
            },
            {    
                $set:
                {
                    personalDetails:
                    { 
                        gender:req.body.gender,
                        about:req.body.about,
                        profilePic:req.body.profilePic,
                        homeTown:req.body.homeTown,
                    }
                }
            }
        );
        res.status(201).json({
            success: true,
            data: "updated user profile",
            message: personDetail,
        });
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { register, login, verifyUser, verifyToken, fetchUser, updateUser}