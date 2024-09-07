dotenv.config({})

import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { v2 as cloudinary } from "cloudinary"
import mainRouter from './routes/main.route.js'
import { Resend } from "resend"
const app = express()

export const resend = new Resend(process.env.RESEND_API_KEY);


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
  });
  

app.use(cors({
  credentials: true,
  origin: "*",
}))

app.use(express.json())
app.use(express.urlencoded({ extended:false}))

app.use(cookieParser())



app.use('/api/v1' , mainRouter)



export default app