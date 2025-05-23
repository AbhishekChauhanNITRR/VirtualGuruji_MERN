const mongoose=require('mongoose');

const tagSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    description:{
        type:String,
        trim:true,
        require:true
    },
    course:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]
})
module.exports=mongoose.model("Tags",tagSchema);