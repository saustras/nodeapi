const mongoose = require('mongoose');



const dbConnection = async()=>{

    try {

        await mongoose.connect( process.env.MONGODB_CNN,)

        console.log("Database listening on")
        
    } catch (error) {
        console.log(error);
        throw new Error('Error connecting into database')
    }

}


module.exports = dbConnection