const mongoose = require('mongoose')

function connectDB () {
    mongoose.connect("mongodb://localhost:27017/BingeBites")
    .then( () =>{
        console.log("BingeBites Database connected successfully")
    } )
    .catch((error)=>{
        console.log(error)
    })
}

module.exports = connectDB;