const jwt=require('jsonwebtoken');
require('dotenv').config();
//auth

exports.auth=async(req,res,next)=>{
    try {
        const token=req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");
        if(!token)
        {
            return res.status(401).json({
                success:false,
                message:"Token missing"
            })
        }
        try {
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode;

        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"Invalid token"
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:error.message
        })
    }
}

//isStudent

exports.isStudent=async(req,res,next)=>{
    try {
        
        if(req.user.accountType !== "Student")
        {
            return res.status(401).json({
                success:false,
                message:"This route is for student only"
            })
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:error.message
        })
    }
}

//isinstructor

exports.isInstructor=async(req,res,next)=>{
    try {
        
        if(req.user.accountType !== "Instructor")
        {
            return res.status(401).json({
                success:false,
                message:"This route is for Instructors only"
            })
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:error.message
        })
    }
}

// isAdmin

exports.isAdmin=async(req,res,next)=>{
    try {
        
        if(req.user.accountType !== "Admin")
        {
            return res.status(401).json({
                success:false,
                message:"This route is for Admin only"
            })
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:error.message
        })
    }
}