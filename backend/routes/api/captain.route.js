const router = require("express").Router()
const captainController = require("../../controllers/captain.controller")

router.use("/register" , captainController.register )

module.exports = router