const app = require('./src/app.js')
const connectDB = require('./src/db/db.js')

connectDB()

app.listen(3000, () =>{
    console.log('Server running')
})