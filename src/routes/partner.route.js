const express = require('express');
const router = express.Router();
const { getFoodPartnerById } = require('../controllers/partner.controller.js');
const { authUserMiddleware } = require('../middlewares/auth.middleware.js');

router.get('/food-partner/:id', authUserMiddleware, getFoodPartnerById);

module.exports = router;