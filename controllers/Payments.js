const instance=require('../config/razorpay');
const { courseEnrollmentEmail } = require('../mail/courseEnrollmentEmail');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender=require('../utils/MailSender');

exports.capturePayment=async(req,res)=>{
    try {

        const {courseId}=req.body;
        const userId=req.user._id;
        if(!courseId || !userId)
        {
            return res.status(402).json({
                success:false,
                message:"User not found"
            })
        }


        const isCourseAlreadyTaken=await User.findOne({_id:userId,courses:courseId});
        if(isCourseAlreadyTaken)
        {
            return res.status(402).json({
                success:false,
                message:"Course already taken"
            })
        }
        const course=await Course.findById(courseId);
        const amount=course.price;
        const currency="INR";

        const options={
            amount:amount*100,
            currency:currency,
            receipt:Math.random(Date.now()).toString,
            notes:{
                courseId,
                userId
            }
        }

        try {

            const paymentResponse=await instance.orders.create(options);
            return res.status(200).json({
                success:true,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                thumbnail:course.thumbnail,
                orderId:paymentResponse._id,
                currency:currency,
                amount:amount,
                message:"Payment done successfully"
            })
            
        } catch (error) {
            return res.status(402).json({
                success:false,
                message:"Payment Failed"
            })
        }
        
    } catch (error) {
        return res.status(402).json({
            success:false,
            message:"Payment Failed"
        })
    }
}

exports.verifySignature=async(req,res)=>{
    try {

        const signature=req.headers["x-razorpay-signature"];
        const webHookSecret=process.env.RAZORPAY_webHookSecret;

        const shaSum=crypto.createHmac("sha256",webHookSecret);
        shaSum.update(JSON.stringify(req.body));
        const digest=shaSum.digest("hex");

        if(signature===digest)
        {
            const {courseId,userId}=req.body.payload.payment.entity.notes;

            try {

                const user=await User.findByIdAndUpdate(
                    {_id:userId},
                    {
                        $push:{
                            courses:courseId
                        }
                    },
                    {
                        new:true
                    }
                )
                const course=await Course.findByIdAndUpdate(
                    {_id:courseId},
                    {
                        $push:{
                            studentsEnrolled:userId
                        }
                    },
                    {
                        new:true
                    }
                )
                const emailResponse=await mailSender( user.email,
                    "Welcome to Virtual_Guruji",
                    "Congo, you are onboared"
                )
                return res.status(200).json({
                    success:true,
                    message:"Course buyed successfully"
                })
                
            } catch (error) {
                return res.status(402).json({
                    success:false,
                    message:"Internal error"
                })
            }
        }
        return res.status(402).json({
            success:false,
            message:"Someone is hitting APi to buy course"
        })
        
    } catch (error) {
        return res.status(402).json({
            success:false,
            message:"Payment Failed"
        })
    }
}