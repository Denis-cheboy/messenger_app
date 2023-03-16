const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profilePic:{
      type:String,
      default:""
    },
    status:{
        type:String,
        default:"online"
    },
    notifications:{
        type:Object,
        default:{}
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports=mongoose.model("user",UserSchema)