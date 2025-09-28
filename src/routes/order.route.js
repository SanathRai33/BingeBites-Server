const express = require('express');
const router = express.Router();
const { authUserMiddleware } = require('../middlewares/auth.middleware.js');
const { placeOrder } = require('../controllers/order.controller.js');

router.post('/', authUserMiddleware, placeOrder);

module.exports = router;