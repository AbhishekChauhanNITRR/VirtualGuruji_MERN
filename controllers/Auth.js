
const OTP=require('../models/OTP');
const User=require('../models/User');
const otpGenerator=require('otp-generator');
const bcrypt=require('bcrypt');
const Profile=require('../models/Profile');
require('dotenv').config();
const jwt=require('jsonwebtoken');

//sendOtp for signUP
exports.sendOtp=async(req,res)=>{
    try {
        const {email}=req.body;
        

        //mail exist check
        const userPresent=await User.findOne({email});
        if(userPresent)
        {
            return res.status(401).json({
                success:false,
                message:'User already Exist'
            })
        }
        
        //otp generate
        var otp=otpGenerator.generate(6,{
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            specialChars:false
        })

        //unique otp generate
        while(await OTP.findOne({otp}))
        {
            otp=otpGenerator.generate(6,{
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false,
                specialChars:false
             })
        }

        // db entry for otp
        const otpPayload= {
            email,
            otp
        }

        const creatingEntry=await OTP.create(otpPayload);

        return res.status(200).json({
            success:true,
            message:"OTP send to user successfully"
        })

    } catch (error) {
        console.log("Unable to send SignUp Otp");
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


// signup
exports.signup=async(req,res)=>{
    try {
        //email exist check
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        }=req.body;

        //validate data
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp || password!==confirmPassword)
        {
            return res.status(402).json({
                success:false,
                message:"Enter required fields, if filled cross check both passwords"
            })
        }
        
        const userExist=await User.findOne({email});
        if(userExist)
        {
            return res.status(400).json({
                success:false,
                message:"User exist already, please log in"
            })
        }

        const recentOTP=await OTP.findOne({email}).sort({createdAt:-1});
        if(!recentOTP)
        {
            return res.status(400).json({
                success:false,
                message:"OTP not found in DB"
            })
        }
        else if(recentOTP.otp !== otp)
        {
            return res.status(400).json({
                success:false,
                message:"OTP mismatch"
            })
        }

        const hashedPassword=await bcrypt.hash(password,10);

        
        const profile=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        })

        const userPayload={
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            contactNumber,
            additionalDetails:profile._id,
            image:`https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`
        }

        const userEntry=await User.create(userPayload);

        return res.status(200).json({
            success:true,
            message:"Entry of User created successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}



// login

exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body;

        if(!email || !password)
        {
            return res.status(400).json({
                success:false,
                message:"Fill all fields"
            })
        }

        const userExist=await User.findOne({email});
        if(!userExist)
        {
            return res.status(400).json({
                success:false,
                message:"SignUp first"
            })
        }

        if(await bcrypt.compare(password,userExist.password))
        {
            const payload={
                email:userExist.email,
                id:userExist._id,
                accountType:userExist.accountType
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            })
            userExist.token=token;
            userExist.password=undefined;
            
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                userExist,
                message:""
            })
        }
        else{
            return res.status(401).json({
            success:false,
            message:"Wrong password"
        })
        }

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"login failed"
        })
    }
}



//change password

exports.changePassword=async(req,res)=>{
    try {
        const {oldPassword, newPassword, confirmNewpassword}=req.body;

        if(!oldPassword || !newPassword || !confirmNewpassword)
        {
            return res.status(400).json({
                success:false,
                message:"Fill all fields"
            })
        }
        if(newPassword !== confirmNewpassword)
        {
            return res.status(400).json({
                success:false,
                message:"Mismatching of passwords"
            })
        }
        
        const user=await User.findById(req.user._id);
        if(await bcrypt.compare(oldPassword,user.password))
        {
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            user.password = hashedPassword;
            await user.save();

            const sendMail=require('../utils/MailSender');
            sendMail(user.email,"Password Changed","Password changed successfully");

            return res.status(200).json({
                success:true,
                message:"Successful changing password"
            })
            
        }

        return res.status(401).json({
            success:false,
            message:"Error occurs in changing password"
        })


    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Error occurs in resetting password"
        })
    }
}