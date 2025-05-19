const mongoose=require('mongoose');

const rNr_Schema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    rating:{
        type:Number
    },
    review:{
        type:String,
        trim:true
    }
})
module.exports=mongoose.model("RatingAndReview",rNr_Schema);