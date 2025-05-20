const Captain = require("../../backend/models/captain.model");
const { captainRegisterValidation } = require("../../backend/services/validationSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

module.exports = { register };
