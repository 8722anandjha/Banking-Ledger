import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Name is required for creating account"],
        trim:true
    },
    email:{
        type: String,
        unique: [true,"Email already exists"],
        required: [true,"Email is required for creating a user"],
        trim: true,
        lowercase: true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Invalid Email address"
        ]
    },
    password:{
        type: String,
        required: [true,"password is required"],
        minlength:[8, "password should contain more than 8 character"],
        select: false
    }
},
{timestamps:true})

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return ;
  }
  const hash  = await bcrypt.hash(this.password, 10);
  this.password = hash;
  
});


userSchema.methods.comparePassword= async function (password){
    return await bcrypt.compare(password,this.password)
}

export const user = new mongoose.model("user",userSchema)