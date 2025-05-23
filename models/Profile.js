const mongoose=require('mongoose');

const userProfileSchema=new mongoose.Schema({
    gender:{
        type:String,
        // enum:["Male", "Female"]
    },
    dateOfBirth:{
        type:String
    },
    about:{
        type:String,
        trim:true
    },
    contactNumber:{
        type:Number,
        trim:true
    }
})
module.exports=mongoose.model("Profile",userProfileSchema);