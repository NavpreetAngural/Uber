const User = require("../models/user.model");
const blackList = require("../../backend/models/blacklistToken.model")
const { registerValidation, loginValidation } = require("../../backend/services/validationSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async (req, res, next) => {
    try {
        const registerValues = await registerValidation.validateAsync(req.body);
        console.log(registerValues);

        const { fullname, email, password } = registerValues;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const saltround = 10;
        const hashPassword = await bcrypt.hash(password, saltround);

        const newUser = new User({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPassword
        });

        await newUser.save();

        const token = jwt.sign({ _id: existingUser._id }, process.env.SECRET, { expiresIn: "24h" });

        res.status(200).json({
            success: true,
            message: "User registered successfully",
            user: registerValues,
            token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

const Login = async (req, res, next) => {
    try {
        const loginValues = await loginValidation.validateAsync(req.body)
        console.log(loginValues);

        const { email, password } = loginValues

        const existingUser = await User.findOne({ email }).select('+password');

        if (!existingUser) {
            res.status(401).json({
                success: false, // not "false"
                msg: "Invalid Email, Please Register First"
            });

        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                msg: "Incorrect Password"
            });
        }

        const token = jwt.sign({ _id: existingUser._id }, process.env.SECRET, { expiresIn: "24h" });

        res.cookie('token', token)
        res.status(200).json({
            success: "true",
            msg: "User Login Successfully",
            user: existingUser,
            token
        })


    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}

const getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user)
}

const logoutUser = async (req, res, next) => {
    res.clearCookie('token')

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    await blackList.create({ token })

    res.status(200).json({ msg: "Logout Success" })

}

module.exports = { register, Login, getUserProfile, logoutUser };

