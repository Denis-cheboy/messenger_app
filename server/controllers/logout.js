const User=require("../models/User")


const logout=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id)
        if(user){
            user.status="offline"
            await user.save()
        }
        return res.status(200).json("Succefully logged out")
    }
    catch(err){
        next(err)
    }
}

module.exports=logout