const {Router}=require("express")
const logout = require("../controllers/logout")

const router=Router()

router.get("/:id",logout)

module.exports=router