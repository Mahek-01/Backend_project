import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";
import connectDB from "./db/index.js";
import dotenv from 'dotenv'


// dotenv config
dotenv.config({
    path: "./.env"
})

// 2nd Approch -- best Approch
connectDB();





// 1st Approch

// ;(async () =>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         console.log("MongoDB connected successfull")
//     } catch (err) {
//         console.log("Error: ", err)
//     }
// }) ()