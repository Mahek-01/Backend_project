import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema ({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim : true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim : true
    },
    fullName: {
        type: String,
        required: true,
        trim : true,
        index: true
    },
    avatar:{
        type: String,  // cloudinary url
        required: true
    },
    coverImage: {
        type: String,  // cloudinary url
        required: true
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken: {
        type: String  
    }
}, 
{
    timestamps: true
});

userSchema.pre("save", async function (next) {
    // agr pw modified nti krta toh kai change na thavu khape
    if(!this.isModified("password")) return next();

    // incrypting the pw
    this.password = bcrypt.hash(this.password, 10)
    next()
})

// checking the pw is correct or not -- DONT'T USE ARROW FUNCTION HERE BCS IT CAN'T WORK HERE FOR (THIS.PASSWORD)
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

// Generating Access Token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            userName : this.userName,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// Generating Refresh Token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);