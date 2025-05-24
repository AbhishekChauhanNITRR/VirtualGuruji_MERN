const Tag=require('../models/Tags');

exports.createTag=async(req,res)=>{
    try {
        
        const {name,description}=req.body;
        if(!name || !description)
        {
            return res.status(401).json({
                success:false,
                message:`All fields are mandatory`
            })
        }
        const payload={
            name:name,
            description:description
        }
        const newTag=await Tag.create(payload);

        return res.status(200).json({
            success:true,
            message:`Tag created Successfully`
        })

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:`error in creating tag : ${error.message}`
        })
    }
}

exports.getAllTags=async(req,res)=>{
    try {
        
        const tags=await Tag.find({},{name:true,description:true});
        res.status(200).json({
            success:true,
            message:"All tags returned successfully",
            tags
        })

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:`error in creating tag : ${error.message}`
        })
    }
}