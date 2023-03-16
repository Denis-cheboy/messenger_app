const errorHandler=async(err,req,res,next)=>{
    const errStatus=err.status || 500
    const errMsg=err.message || "Something went wrong"

    return res.status(errStatus).json({
        success:false,
        status:errStatus,
        message:errMsg,
        stack:err.stack
    })
}

module.exports=errorHandler