const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile=async(req,res)=>{
    try {

        const {gender,dateOfBirth="",about="",contactNumber}=req.body;
        const userId=req.user._id;

        if(!userId || !gender || !contactNumber)
        {
            return res.status(401).json({
                success:false,
                message:"Fill all fields"
            })
        }
        const updateuser=await User.findByIdAndUpdate(
            {_id:userId},
            {
                $set: {
                    "additionalDetails.gender": gender,
                    "additionalDetails.dateOfBirth": dateOfBirth,
                    "additionalDetails.about": about,
                    "additionalDetails.contactNumber": contactNumber,
                },
            },
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:"Profile updated successfully"
        })
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Internal Server issue"
        })
    }
}

exports.deleteAccount=async(req,res)=>{
    try {

        const userId=req.user._id;
        const user=await User.findById(userId);
        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"No such user found "
            })
        }
        await Profile.findByIdAndDelete(user.additionalDetails._id);

        const allcourses=user.courses;
        for(let i=0;i<allcourses.length;i++)
        {
            const courseId=allcourses[i];
            await Course.findByIdAndUpdate(
                {_id:courseId},
                {
                    $pull:{
                        studentsEnrolled:userId
                    }
                },
                {new:true}
            )
        }

        await User.findByIdAndDelete(userId);
        


        return res.status(200).json({
            success:true,
            message:"Account deleted"
        })
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Internal Server issue"
        })
    }
}