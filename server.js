import "./src/config/env.js"

import app from "./src/app.js";
import connectDB from "./src/db/dbs.js";


connectDB()

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})