
import { user } from "../models/user.model.js"
import jwt from "jsonwebtoken"
import sendRegisterationEmail from "../service/email.service.js"


/**
- user register controller
- POST /api/auth/register
 */
export const registerUser = async(req,res)=>{
        const {name,email,password}= req.body

        const isExists = await user.findOne({email: email})
        if(isExists){
            return res.status(422).send({
                message: "User already exists with email.",
                status: "failed"
            })
        }

        const newUser= await user.create({
            email,password,name
        })
        const token= jwt.sign({ userId: newUser._id},process.env.JWT_SECRET,{expiresIn: "2d"})

        res.cookie("token",token)
        res.status(201).send({
            _id:newUser._id,
            email: newUser.email,
            name: newUser.name,
            token: token
        })

        await sendRegisterationEmail(email,name);
}

/**
 * - User login controller
 * - POST /api/auth/login
 */

export const loginUser= async(req,res)=>{
    const {email,password}= req.body
    
    const User= await user.findOne({email}).select("+password")
    if(!User){
        return res.status(401).send({
            message: "Email or passwrod is inValid." 
        })
    }

    const isValidPassword= await User.comparePassword(password)
    if(!isValidPassword){
        return res.status(401).send({
            message: "Email or password is Invalid."
        })
    }
    
   const token= jwt.sign({ userId: User._id},process.env.JWT_SECRET,{expiresIn: "2d"})

        res.cookie("token",token)
        res.status(200).send({
            _id:User._id,
            email: User.email,
            name: User.name,
            token: token
        })

}