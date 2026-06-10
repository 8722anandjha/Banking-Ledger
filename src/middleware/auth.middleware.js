import {user} from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const authorization= async(req , res ,next)=>{
  
    const token= req.cookies?.token || req.headers.authorization;
    if(!token){
        return res.status(401).send({
            message: "Unauthorized access, token is missing"
        })
    }

    try{

        const decoded= jwt.verify(token,process.env.JWT_SECRET)
        const User= await user.findById(decoded.userId)
        req.user= User
        return next()

    }catch(err){
        return res.status(401).send({
            message:"Unauthorised access, token is invalid"
        })
    }
}