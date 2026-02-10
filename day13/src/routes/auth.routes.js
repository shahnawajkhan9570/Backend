const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRoute = express.Router()
const crypto = require("crypto")

// api/auth/register

authRoute.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    const isUseAlreadyExist = await userModel.findOne({email})

    if(isUseAlreadyExist){
        return res.status(409).json({
            message: "user already exists"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

   const user = await userModel.create({
        name, email, password: hash
    })

    const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET)

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "user registered",
        user,
        token
    })
})

authRoute.post("/protected", (req, res) => {
    console.log(req.cookies)

    res.status(200).json({
        message: "this is protected route"
    })
})


// api/auth/login
authRoute.post("/login", async (req, res) => {
   const {email, password} = req.body

   const user = await userModel.findOne({email})
   if(!user){
    return res.status(404).json({
        message: "user not found this email"
    })
   }


   const isPasswordMatch = user.password === crypto.createHash("md5").update(password).digest("hex")
   if(!isPasswordMatch){
    return res.status(401).json({
        message: "invalid password"
    })
   }

   

   const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

   res.cookie("jwt_token", token)

   res.status(200).json({
        message: "login successful",
        user,
        token
   })
})


module.exports = authRoute