const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');

// Connect to MongoDB
const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log(`Database connected successfully`.red.bold);
    })
    
}

module.exports=dbConnection;