// server ko start karna
// database se connect karna

const mongoose = require('mongoose')


require('dotenv').config()
const connectToDb = require('./src/config/database')
const app = require('./src/app')


// function connectToDb(){
//     mongoose.connect('mongodb+srv://shahnawajkhan9570_db_user:WKEqkScEEAkC3i5c@cluster0.ygp2cdz.mongodb.net/day7')
//     .then(()=>{
//         console.log('connected to db')
//     })
// }
connectToDb()

app.listen(3000, ()=>{
    console.log('server is running on port 3000')
})