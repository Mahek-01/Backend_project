import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";
import connectDB from "./db/index.js";
import dotenv from 'dotenv'
import { app } from "./app.js";


// dotenv config
dotenv.config({
    path: "./.env"
})

// 2nd Approch -- best Approch
connectDB()
.then(() =>{
    app.listen(process.env.PORT || 5000, ()=>{
        console.log(`Server Run on this port ${process.env.PORT}`)
    })
})
.catch((err) =>{
    console.log("MongoDB is Not Connected" + err)
})





// 1st Approch

// ;(async () =>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         console.log("MongoDB connected successfull")
//     } catch (err) {
//         console.log("Error: ", err)
//     }
// }) ()