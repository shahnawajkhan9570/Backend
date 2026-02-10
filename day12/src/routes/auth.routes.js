const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

const authRoute = express.Router()

// api/auth/register

authRoute.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    const isUseAlreadyExist = await userModel.findOne({email})

    if(isUseAlreadyExist){
        return res.status(400).json({
            message: "user already exists"
        })
    }

   const user = await userModel.create({
        name, email, password
    })

    const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET)

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "user registered",
        user,
        token
    })
})


module.exports = authRoute