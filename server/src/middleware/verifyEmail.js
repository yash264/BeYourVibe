const nodemailer = require("nodemailer");

const verifyEmail = async(userId, email, otp) => {
    try{
        const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "yp5094280@gmail.com",
                pass: "nokoctntwjppagot",    //   noko ctnt wjpp agot
            },
        }); 

        const mailOptions = {
            from: {
                name: "Be Your Vibe",
                address: "yp5094280@gmail.com"
            },
            to: email,
            subject: "Regarding registration on Be Your Vibe ",
            html:
                ` 
                    <html>
                            <h3>Welcome to Be Your Vibe !! </h3>
                            <div>
                                <img src="https://t4.ftcdn.net/jpg/05/94/39/47/360_F_594394711_JcBD8PvFX2Tewf62YtuCHj57fcPxN7AZ.jpg" width="100px"/>
                            </div>
                            <h4> Dear ${userId} ,</h4>
                            <br>
                            <p>Your OTP for registration is ${otp}</p>
                            <br>
                            <p>We look forward to helping you get the most out of our services!</p>
                            <p>Best regards,</p>
                            <br>
                        <div>
                            <p>&copy; 2024 Designed, Developed and Hosted by National Informatics Center.</p>
                        </div>
                    </html>
                `,
        };
        transport.sendMail(mailOptions, (error, success) => {
            if (error) {
                console.log(error);
            } else {
                console.log("OTP send");
            }
        })
    }
    catch(error){
        console.log(error);
    }
}

module.exports = { verifyEmail };