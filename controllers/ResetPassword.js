//token

const User = require("../models/User");
const mailSender=require('../utils/MailSender');
const bcrypt=require('bcrypt');

exports.resetPasswordToken=async(req,res)=>{
    try {
        const {email}=req.body;
        const currUser=await User.findOne({email});
        if(!currUser)
        {
            return res.status(401).json({
                success:false,
                message:"Unable to reset password"
            }) 
        }
        const token=crypto.randomUUID();
        const newUser=await User.findOneAndUpdate(
            {email:email},
            {
                token:token,
                resetPasswordExpires:Date.now()+5*60*1000
            },
            {new:true}
        )
        const url=`http://localhost:3000/update-password/${token}`;
        await mailSender(email,"Change your password", url);
        
        return res.status(200).json({
            success:true,
            message:"Go to mail and change password"
        })

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Unable to reset password"
        })
    }
}


//reset password
exports.resetPassword=async(req,res)=>{
    try {
        const {password,confirmPassword,token}=req.body;
        if(!password || !confirmPassword || !token)
        {
            return res.status(401).json({
                success:false,
                message:"Fill all fields"
            })
        }
        const currUser=await User.findOne({token});
        if(!currUser || currUser.resetPasswordExpires<Date.now())
        {
            return res.status(401).json({
                success:false,
                message:"Try again after some time"
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await User.findOneAndUpdate(
            {token:token},
            {
                password:hashedPassword
            },
            {new:true}
        )
        return res.status(200).json({
            success:true,
            message:"Successful password reset"
        })
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Unable to reset password"
        })
    }
}