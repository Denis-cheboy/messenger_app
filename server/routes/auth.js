const {Router}=require("express")
const { register, loginUser } = require("../controllers/auth")

const router=Router()

router.post("/register",register)
router.post("/login",loginUser)

module.exports=router