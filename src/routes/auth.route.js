const express = require('express')
const router = express.Router();
const { registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner } = require('../controllers/auth.controller.js')

// User authentication
router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logoutUser)

// Food Partner authentication
router.post("/register", registerFoodPartner)
router.post("/login", loginFoodPartner)
router.get("/logout", logoutFoodPartner)

module.exports = router;