const nodemailer=require('nodemailer');
require('dotenv').config();

const sendmail=async(email,title,body)=>{
    try {
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })
        let info=await transporter.sendMail({
            from:'VirtualGuruji || Chauhan',
            to:'${email}',
            subject:'${title}',
            text:'${body}',
        })
        return info;
    } catch (error) {
        console.log(error.message);
    }
}
module.exports=sendmail;