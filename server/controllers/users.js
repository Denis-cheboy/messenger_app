const User=require("../models/User")

const getUser=async(req,res,next)=>{
    try{
      const user=await User.findById(req.params.id)
      return res.status(200).json(user)
    }
    catch(err){
        next(err)
    }
}

const deleteUser=async(req,res,next)=>{
    try{
      await User.findByIdAndDelete(req.params.id)
      return res.status(200).json("Successfully deleted")
    }
    catch(err){
        next(err)
    }
}
const updateUser=async(req,res,next)=>{
    try{
      const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
      return res.status(200).json(updatedUser)
    }
    catch(err){
        next(err)
    }
}
const getUsers=async(req,res,next)=>{
    try{
      const users=await User.find()
      return res.status(200).json(users)
    }
    catch(err){
        next(err)
    }
}

module.exports={
    getUser,getUsers,deleteUser,updateUser
}