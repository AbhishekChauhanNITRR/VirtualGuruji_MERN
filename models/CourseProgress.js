const mongoose=require('mongoose');

const courseProgressSchema=new mongoose.Schema({
    
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        requires:true,
        ref:"Course"
    },
    complatedVideos:[{
        typr:mongoose.Schema.Types.ObjectId,
        ref:"Subsection"
    }]
})
module.exports=mongoose.model("CourseProgress",courseProgressSchema);