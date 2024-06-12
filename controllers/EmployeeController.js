const Employee=require("../models/Employee")
const bcrypt=require("bcrypt");
const dotenv=require("dotenv");

const { json } = require("express");
const jsonwebtoken = require('jsonwebtoken');

dotenv.config()

const register = async (req,res)=>{
    const {name,email,password,role} = req.body
    const emailCheck= await Employee.findOne({"email":email})
    if(emailCheck){
        res.json({"msg":"Email Exists"})
    }
    else{
        const newpassword= await bcrypt.hash(password,10)
         const cemp = new Employee({
                name,
                email,
                password:newpassword,
                role
            })
            await cemp.save()
            res.status(200).json({"MESSAGE":"Registration Successful"})
    }
}

const login= async  (req,res)=>{
    const {email,password} = req.body

    const login_val= await Employee.findOne({"email":email})
    if(login_val){
        if(await bcrypt.compare(password,login_val.password)){
        let payload={
            "id":login_val._id,
            "email":email
        }
    jsonwebtoken.sign(payload,process.env.SECRET,{expiresIn:"1h"},(err,data)=>{
            if(err){
                res.status(500).json({"error":"Unable to generate the JWT Token"})
            }
            else{
                res.status(200).json({"msg":"login Successful","tkn":data})
            }
        })
        
        }
        else{
            res.status(401).json({"msg":"Password Wrong"})
        }
    }
    else{ 
        res.status(401).json({"msg":"Email Doesn't Exists"})
    }
}

const getAll= async (req,res)=>{
    let decoded_jwt=jsonwebtoken.decode(req.headers['w-access-token'],process.env.SECRET,algorithms=["HS256"])
    console.log(decoded_jwt.id)
    let empdet=await Employee.find()
    if(empdet){
    res.status(200).json(empdet)
    }
    else{
        res.status(200).json({"error":"while Fetching"})
    }
}

module.exports = {register,login,getAll}