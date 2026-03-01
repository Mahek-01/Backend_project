import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const connectDB = async () =>{
    try{
        const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`MongoDB Is Successfully Connected !! DB Host ${connectInstance.connection.host}`)
    }
    catch (err){
        console.log("Error" ,err)
    }
}

export default connectDB;