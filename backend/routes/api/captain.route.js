const router = require("express").Router()
const captainController = require("../../controllers/captain.controller")
const authMiddleware = require("../../middlewares/auth.middleware")

router.post("/register", captainController.register)
router.post("/login", captainController.login)
router.get("/profile", authMiddleware.authCaptain, captainController.profile)
router.get("/logout" , authMiddleware.authCaptain , captainController.logout)

module.exports = router