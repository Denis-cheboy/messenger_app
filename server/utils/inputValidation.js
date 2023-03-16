const Joi=require("@hapi/joi")

const registerValidation=(input)=>{
    const schema=Joi.object({
        username:Joi.string().required(),
        password:Joi.string().min(6),
        email:Joi.required(),
        profilePic:Joi.string()
    })
    return schema.validate(input)
}
const loginValidation=(input)=>{
    const schema=Joi.object({
        password:Joi.string().min(6),
        email:Joi.required(),
    })
    return schema.validate(input)
}

module.exports={
    registerValidation,loginValidation
}