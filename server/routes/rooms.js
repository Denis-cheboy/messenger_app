const {Router}=require("express")

const router=Router()
const rooms=[
    "general","tech","finance","crypto","marketing"
]

router.get("/",(req,res,next)=>{
    return res.status(200).json(rooms)
})

module.exports=router