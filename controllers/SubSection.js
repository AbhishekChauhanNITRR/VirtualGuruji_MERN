const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require('dotenv').config();

exports.createSubSection=async(req,res)=>{
    try {

        const {title, description, timeDuration, sectionId}=req.body;
        const video=req.files.videoFile;

        if(!title || !description || !timeDuration || !sectionId || !video)
        {
            return res.status(402).json({
                success:false,
                message:"Fields empty"
            })
        }
        const upload=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        const newSubSec=await SubSection.create({
            title:title,
            description:description,
            timeDuration:timeDuration,
            videoURL:upload.secure_url
        })
        const updatedSection=await Section.findByIdAndUpdate(
            {_id:sectionId},
            {
                $push:{
                    subSection:newSubSec._id
                }
            },
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:"SubSection created successfully",
            updatedSection
        })
        
    } catch (error) {
        return res.status(402).json({
            success:false,
            message:"Error in creating subSection"
        })
    }
}


exports.updateSubSection=async(req,res)=>{
    try {

        const {title, description, timeDuration,subSectionId}=req.body;
        const video=req.files.videoFile;

        if(!title || !description || !timeDuration || !video || !subSectionId)
        {
            return res.status(402).json({
                success:false,
                message:"Fields empty"
            })
        }
        const upload=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        const updatedSubSec=await SubSection.findByIdAndUpdate(
            {_id:subSectionId},
            {
                title:title,
                description:description,
                timeDuration:timeDuration,
                videoURL:upload.secure_url
            },
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:"SubSection updated successfully",
            updatedSection
        })
        
    } catch (error) {
        return res.status(402).json({
            success:false,
            message:"Error in updating subSection"
        })
    }
}
exports.deleteSubSection=async(req,res)=>{
    try {

        const {subSectionId}=req.body;

        if(!subSectionId)
        {
            return res.status(402).json({
                success:false,
                message:"Fields empty"
            })
        }
        const updatedSubSec=await SubSection.findByIdAndDelete(subSectionId);

        return res.status(200).json({
            success:true,
            message:"SubSection deleted successfully",
            updatedSection
        })
        
    } catch (error) {
        return res.status(402).json({
            success:false,
            message:"Error in deleting subSection"
        })
    }
}