const mongoose = require('mongoose');


require('dotenv').config();


const mongouri = process.env.MONGODB;

const initializeDatabase = async() =>{
    await mongoose.connect(mongouri).then(()=>{
        console.log("Database connection has been successfully established");
        
    })
    .catch((error)=>{
        console.log("An error has occurred while connecting to database", error);
        
    })
}

module.exports ={initializeDatabase}