const mongoose=require('mongoose');

const SectionSchema=new mongoose.Schema({
    sectionName:{
        type:String,
        require:true
    },
    subSection:[{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"SubSection"
    }]
    
})
module.exports=mongoose.model("Section",SectionSchema);