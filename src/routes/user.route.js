const express = require('express')
const router = express.Router();
const { userProfile, updateUserProfile } = require('../controllers/user.controller.js')
const { authUserMiddleware } = require('../middlewares/auth.middleware.js');

router.get("/profile", authUserMiddleware, userProfile)
router.put('/profile', authUserMiddleware, updateUserProfile)

module.exports = router;