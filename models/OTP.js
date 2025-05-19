const mongoose=require('mongoose');
const sendmail = require('../utils/MailSender');

const otpSchema=mongoose.Schema({
    email:{
        type:String,
        trim:true,
        require:true
    },
    otp:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        require:true,
        default:Date.now(),
        expires:5*60
    }
})

const sendingMail=async(email,otp)=>{
    try {
        const mailResponse=await sendmail(email,"Verification mail from Virtual Guruji",otp);
    } catch (error) {
        console.log("error occured in sending mail: ",error);
    }
}

otpSchema.pre("save",async function(next)
    {
        await sendingMail(this.mail,this.otp);
        next();
    }
)

module.exports=mongoose.model("OTP",otpSchema);