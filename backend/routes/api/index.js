const router = require("express").Router()

const userRoutes = require("./user.route")
const captainRoutes = require("./captain.route")

router.use("/user", userRoutes)
router.use("/captain", captainRoutes)

module.exports = router