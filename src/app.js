const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('../src/routes/auth.route.js')

const app = express();
app.use(cookieParser())
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Hello world")
})

app.use('/api/user', authRoutes);

module.exports = app;