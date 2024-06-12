const empctr = require("../controllers/EmployeeController")
const express = require("express")
const router=express.Router()

const {verifyToken,commonLimit}=require("../JWT/jwt")
router.post("/register",empctr.register)
router.post("/login",empctr.login)
router.get("/all-employees",[verifyToken,commonLimit],empctr.getAll)
//export
module.exports=router