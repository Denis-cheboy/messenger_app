const mongoose=require("mongoose")

const connectDB=async(req,res,next)=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/messageAppDB",{
            useUnifiedTopology:false,
            useNewUrlParser:false
        })

    }
    catch(err){
        next(err)
    }
}

module.exports=connectDB