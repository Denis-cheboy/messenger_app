const mongoose=require("mongoose")

const MessageSchema=new mongoose.Schema({
    from:Object,
    to:String,
    content:{
        type:String,
        required:true,
    },
    date:String,
    time:String,
    socketId:String
},{timestamps:true,minimize:false})

module.exports=mongoose.model("message",MessageSchema)