import mongoose, { Model, Schema } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



const hash_rounds = 10

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: ""

    },
    gender:{
        type: String,
        enum: ['male', 'female', 'custom'], 
        required: true, 
    },
    coverImage:{
        type:String,
        default:""
    },
    followers: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    
    bio: {
        type: String,
        default: ""
    },
    posts:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    ],
    refreshToken:{
        type:String,

    },
    verificationToken:{
        type:String
    },
    savedPost:[
        {
            type:Schema.Types.ObjectId,
            ref:"Post"
        },
    ],
    isVerified:{
        type:Boolean,
        default:false
    }


}, { timestamps: true })




//  hash user password -------

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, hash_rounds)

    next()
})


// compare user password -----

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}


// generate access token and refresh token

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )
}



userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id
    }, process.env.REFRESH_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


const User = mongoose.model('User', userSchema)

export default User