import {accountModel} from "../models/account.model.js"

export const createAccount= async(req , res)=>{
    const user= req.user

    const account= await accountModel.create({
        user:user._id
    })

    res.status(201).send({
        account
    })
}