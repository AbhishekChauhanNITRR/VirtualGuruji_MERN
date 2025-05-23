const express=require('express');
const mongoose = require('mongoose');
const { resetPasswordToken } = require('../controllers/ResetPassword');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        trim:true
    },
    lastName:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        require:true
    },
    accountType:{
        type:String,
        enum:["Student", "Instructor", "Admin"],
        require:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"Profile"
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"Courses"
    }],
    image:{
        type:String,//URL
        require:true
    },
    token:{
        type:String
    },
    resetPasswordExpires:{
        type:Date
    },
    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    }]
})
module.exports=mongoose.model("User",userSchema); 