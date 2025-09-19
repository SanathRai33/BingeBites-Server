const express = require('express')
const router = express.Router();
const { userProfile } = require('../controllers/user.controller.js')
const { authUserMiddleware } = require('../middlewares/auth.middleware.js');

router.get("/profile", authUserMiddleware, userProfile)

module.exports = router;