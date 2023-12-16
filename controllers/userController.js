const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signup = async (req,res,next) => {
    try {
        //console.log("inside register")
        const { username, email, password } = req.body;

        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) return res.json({ msg: "Username already used", status: false });

        const emailCheck = await User.findOne({ email });
        if (emailCheck) return res.json({ msg: "Email already used", status: false }); 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,

        });

        const data = 
        {
            user : {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data,process.env.JWT_SECRET);

        return res.json({ status: true, authtoken });
    }
    catch (er) {
        console.log(er.message);
    }
}


module.exports.login = async (req, res, next) => {
    try {
        //console.log("inside register")
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.json({ msg: "User doesn't exist", status: false }); 

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.json({ msg: "Incorrect Password for the given username", status: false });

        const data = 
        {
            user : {
                id: user.id
            }
        }
        // var data = user.id;
        const authtoken = jwt.sign(data,process.env.JWT_SECRET);
        return res.json({ status: true, authtoken:authtoken });
    }
    catch (er) {
        console.log(er.message);
    }
};