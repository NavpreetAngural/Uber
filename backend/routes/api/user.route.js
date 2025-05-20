const router = require("express").Router();
const userController = require("../../controllers/user.controller");
const authMiddleware = require("../../middlewares/auth.middleware")

// POST /api/users/register
router.post("/register", userController.register);

// POST /api/users/login
router.post("/login", userController.Login);

// POST /api/users/profile
router.get("/profile", authMiddleware.authUser, userController.getUserProfile);

// POST /api/users/logout
router.get("/logout" , authMiddleware.authUser , userController.logoutUser)

module.exports = router;
