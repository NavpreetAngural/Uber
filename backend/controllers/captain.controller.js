const Captain = require("../../backend/models/captain.model");
const { captainRegisterValidation, captainLoginValidation } = require("../../backend/services/validationSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");

const register = async (req, res, next) => {
    try {
        const registerValues = await captainRegisterValidation.validateAsync(req.body);
        const { fullname, email, password, vehicle } = registerValues;

        const existingUser = await Captain.findOne({ email });

        if (existingUser) {
            return res.status(401).json({
                success: false,
                msg: "Captain Already Exists"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new Captain({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname
            },
            email,
            password: hashPassword,
            vehicle: {
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity,
                vehicleType: vehicle.vehicleType
            }
        });

        await newUser.save();

        const token = jwt.sign({ _id: newUser._id }, process.env.SECRET, { expiresIn: "24h" });

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

const login = async (req, res, next) => {
    try {
        const captainloginValues = await captainLoginValidation.validateAsync(req.body)
        console.log(captainloginValues)

        const { email, password } = captainloginValues

        const existingUser = await Captain.findOne({ email }).select('+password')

        if (!existingUser) {
            res.status(400).json({
                success: false,
                msg: "Invalid Email, Please Register First"
            })
        }

        const isMatch = await bcrypt.compare(password, existingUser.password)
        if (!isMatch) {
            res.status(401).json({
                success: false,
                msg: "Incorrect Password"
            })
        }

        const token = jwt.sign({ _id: existingUser._id }, process.env.SECRET, { expiresIn: "24h" });

        res.cookie('token', token)

        res.status(200).json({
            success: true,
            msg: "Captain Login Successfully",
            captain: existingUser,
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

const profile = async (req, res, next) => {

    res.status(200).json({ captain: req.captain })
}

const logout = async (req, res, next) => {
    res.clearCookie('token')

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    await blacklistTokenModel.create({ token })

    res.status(200).json({ msg: "Logout Success" })
}

module.exports = { register, login, profile, logout };
