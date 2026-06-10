import mongoose from "mongoose";

 const connectDB=()=>{
                    mongoose.connect(process.env.MONGODB_URI)
                    .then(()=>{
                        console.log("server is connected to DB.")
                    })
                    .catch(
                        (err)=>{
                            console.log("Error while connecting to DB",err)
                            process.exit(1)
                        }
                    )
}

export default connectDB;