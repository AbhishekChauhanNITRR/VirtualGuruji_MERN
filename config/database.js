const mongoose=require('mongoose');
require('dotenv').config();

exports.connectServerWithDB=async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("DB connected with Server successfully");
    } catch (error) {
        console.log("DB connection FAILS");
        console.log(error.message);
        process.exit(1);
    }
}