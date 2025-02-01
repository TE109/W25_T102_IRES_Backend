const CFG = require("./config/config");
const app = require("./config/app");
const { default: mongoose } = require("mongoose");

require('dotenv').config();
const connectToMongo = require('./config/db');

connectToMongo();

// const database = 'mongodb+srv://willbluemoon99:EmCK6UKBZx7vVQJm@ryan.nz0hm.mongodb.net/IRES?retryWrites=true&w=majority&appName=Ryan'

// //Connect to database
// mongoose.connect(database, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Connected to MongoDB Atlas');
// }).catch((error) => {
//     console.error('Error connecting to MongoDB Atlas', error.message);
// });


// Basic route for testing
app.get('/', (req, res) => {
    res.send('IRes Backend is Running!');
});

// Start the server
app.listen(CFG.PORT, () => {
    console.log(`Server is running on http://localhost:${CFG.PORT}`);
});
