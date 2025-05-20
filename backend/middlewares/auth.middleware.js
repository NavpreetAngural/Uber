const User = require("../../backend/models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    if (!token) {
        res.status(401).json({ msg: "unauthorized Access" })
    }

    const isBlackListed = await User.findOne({ token : token})

    if(isBlackListed){
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

module.exports =  {authUser}