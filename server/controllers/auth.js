const User=require("../models/User")
const { registerValidation, loginValidation } = require("../utils/inputValidation")
const createError=require("../utils/createError")
const { hashPassword, comparePassword } = require("../utils/passwordHashing")
const jwt=require("jsonwebtoken")

const register=async(req,res,next)=>{
    const {error}=registerValidation(req.body)
    if(error) return next(createError(400,error.details[0].message))
    const {username,email,password,profilePic}=req.body
    const foundUser=await User.findOne({email:email})
    if(foundUser) return next(createError(400,"User already exists"))
    const hash=await hashPassword(password)
    try{
        const newUser=await User.create({
            password:hash,
            username:username,
            email:email,
            profilePic:profilePic,
        })
        return res.status(200).json(newUser)

    }
    catch(err){
        next(err)
    }
}

const loginUser=async(req,res,next)=>{
    const {error}=loginValidation(req.body)
    if(error) return next(createError(400,error.details[0].message))
    const {password,email}=req.body
    try{
       const foundUser=await User.findOne({email:email})
       if(!foundUser) return next(createError(400,"User does not exists"))
       const comparePasswords=await comparePassword(password,foundUser.password)
       if(!comparePasswords) return next(createError(400,"Wrong password or email"))

       foundUser.status="online"
       
       await foundUser.save()
       const accessToken=jwt.sign({userId:foundUser._id,isAdmin:foundUser.isAdmin},process.env.ACCESS_TOKEN,{expiresIn:"1d"})
       const {password:userPassword,...others}=foundUser._doc
       return res.status(200).json({...others,accessToken})
    }
    catch(err){
        next(err)
    }
}

module.exports={
    register,loginUser
}