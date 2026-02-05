// server ko start karna
//database se connect karna


const app = require('./src/app')
const mongoose  = require('mongoose')


function connectToDb() {
    mongoose.connect('mongodb+srv://shahnawajkhan9570_db_user:WKEqkScEEAkC3i5c@cluster0.ygp2cdz.mongodb.net/day6')
        .then(() =>{
            console.log('Connected to MongoDB')
        })
        // .catch(err => console.error('Failed to connect to MongoDB:', err));
}

connectToDb();

app.listen(3000, async () => {
    console.log('server is running on port 3000')
})