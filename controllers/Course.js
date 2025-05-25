const Course=require('../models/Course')
const User=require('../models/User')
const Category=require('../models/category');
const {uploadImageToCloudinary}=require('../utils/imageUploader')
require('dotenv').config();

exports.createCourse=async(req,res)=>{
    try {
        
        const {courseName,courseDescription,whatYouWillLearn,price,tag}=req.body;
        const thumbnail=req.files.thumbnailImage;

        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail)
        {
            return res.status(402).json({
                success:false,
                message:"Enter all fields"
            })
        }

        const id=req.user._id;
        const instructor=await User.findById(id);
        if(!instructor)
        {
            return res.status(401).json({
                success:false,
                message:"Unverified instructor"
            })
        }
        const tagDetails=await Category.findById(tag);
        if(!tagDetails)
        {
            return res.status(401).json({
                success:false,
                message:"Invalid Tag"
            })
        }

        const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        const newCourse={
            courseName,
            courseDescription,
            instructor:id,
            whatYouWillLearn,
            price,
            tag:tag,
            thumbnail:thumbnailImage.secure_url 
        }
        
        const pushCourse=await Course.create(newCourse);

        const updateInstructor=await User.findByIdAndUpdate(
            {_id:id},
            {
                $push:{
                    courses:pushCourse._id
                }
            },
            {new:true}
        )

        const updateTag=await Category.findByIdAndUpdate(
            {_id:tag},
            {
                $push:{
                    course:pushCourse._id
                }
            },
            {new:true}
        )
        

        return res.status(401).json({
            success:true,
            message:"Course created successfully"
        })

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Error in creating course"
        })
    }
}


exports.getAllCourses=async(req,res)=>{
    try {
        
        const courses=await Course.find({});
        res.status(200).json({
            success:true,
            message:"All courses returned successfully",
            courses
        })

    } catch (error) {
        return res.status(401).json({
            success:true,
            message:"Error in getting Courses"
        })
    }
}