const express = require('express')
const router = express.Router();
const { registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner, checkAuth } = require('../controllers/auth.controller.js')

// User authentication
router.post("/user/register", registerUser)
router.post("/user/login", loginUser)
router.get("/user/logout", logoutUser)

// Check authentication status
router.get("/check", checkAuth)

// Food Partner authentication
router.post("/foodPartner/register", registerFoodPartner)
router.post("/foodPartner/login", loginFoodPartner)
router.get("/foodPartner/logout", logoutFoodPartner)

module.exports = router;