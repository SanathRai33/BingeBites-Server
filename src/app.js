const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('../src/routes/auth.route.js')
const foodRoutes = require('../src/routes/food.route.js')

const app = express();
app.use(cookieParser())
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Hello world")
})

app.use('/api/auth', authRoutes);

app.use('/api/food', foodRoutes);

module.exports = app;