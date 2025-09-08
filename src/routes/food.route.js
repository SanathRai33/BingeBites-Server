const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authFoodPartnerMiddleware, authUserMiddleware } = require('../middlewares/auth.middleware.js');
const { createFood, getFoodItems } = require('../controllers/food.controller.js');

const upload = multer({
    storage: multer.memoryStorage(),
})

router.post('/', authFoodPartnerMiddleware, upload.single('video'), createFood)

router.get('/get', authUserMiddleware, getFoodItems)

module.exports = router;