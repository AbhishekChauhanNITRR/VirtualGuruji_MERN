const Course = require("../models/Course");
const Section = require("../models/Section");

exports.createSection=async(req,res)=>{
    try {
        
        const {sectionName,course}=req.body;
        if(!sectionName || !course)
        {
            return res.status(401).json({
                success:false,
                message:"Fill all fields"
            })
        }
        const newSec=await Section.create({sectionName});
        const updatedCourse=await Course.findByIdAndUpdate(
            {_id:course},
            {
                $push:{
                    courseContent:newSec._id
                }
            },
            {
                new:true
            }
        );

        return res.status(200).json({
            success:true,
            message:"Section created successfully"
        })


    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Error in creating Section"
        })
    }
}

exports.updateSection=async(req,res)=>{
    try {

        const {sectionName,sectionId}=req.body;
        const updatesSection=Section.findByIdAndUpdate(
            {_id:sectionId},
            {
                sectionName:sectionName
            },
            {
                new:true
            }
        );
        return res.status(200).json({
            success:true,
            message:"Section updated successfully"
        })
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Error in Updating Section"
        })
    }
}

exports.deleteSection=async(req,res)=>{
    try {
        
        const {sectionId}=req.params;
        await Section.findByIdAndDelete(sectionId);
        return res.status(200).json({
            success:true,
            message:"Section Deleted successfully"
        })

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Error in Deleting Section"
        })
    }
}