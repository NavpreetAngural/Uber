const User = require("../../backend/models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const blacklistTokenModel = require("../models/blacklistToken.model")
const captainModel = require("../models/captain.model")

const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    if (!token) {
        res.status(401).json({ msg: "unauthorized Access" })
    }

    const isBlackListed = await blacklistTokenModel.findOne({ token: token })

    if (isBlackListed) {
        res.status(401).json({ msg: "unauthorized Access" })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        const user = await User.findById(decoded._id)
        req.user = user
        next()

    }
    catch (err) {
        res.status(401).json({ msg: "unauthorized Access" })
    }
}

const authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    if (!token) {
        res.status(401).json({ msg: "unauthorized Access" })
    }

    const isBlackListed = await blacklistTokenModel.findOne({ token: token })

    if (isBlackListed) {
        res.status(401).json({ msg: "unauthorized Access" })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain
        next()

    }
    catch (err) {
        res.status(401).json({ msg: "unauthorized Access" })
    }
}

module.exports = { authUser , authCaptain}