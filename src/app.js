const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('../src/routes/auth.route.js')
const foodRoutes = require('../src/routes/food.route.js')
const partnerRoutes = require('../src/routes/partner.route.js')

const app = express();
app.use(cors({
    origin: 'https://binge-bites-git-main-sanath-rais-projects.vercel.app',
    credentials: true
}));
app.use(cookieParser())
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Hello world")
})

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/partner', partnerRoutes);

module.exports = app;