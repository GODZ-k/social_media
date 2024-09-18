dotenv.config({})

import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { v2 as cloudinary } from "cloudinary"
import mainRouter from './routes/main.route.js'
import path from 'path'
import { Resend } from "resend"
const app = express()

export const resend = new Resend(process.env.RESEND_API_KEY);

const __dirname = path.resolve();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
  });
  

app.use(cors({
  credentials: true,
  // origin: "https://social-media-bmt3.vercel.app",
  origin: "*",
  methods: 'GET,POST,PUT,DELETE,PATCH',  // Allow the methods you're using
  allowedHeaders: 'Content-Type,Authorization'  // Headers to allow
}))

app.use(express.json())
app.use(express.urlencoded({ extended:false}))

app.use(cookieParser())



app.use('/api/v1' , mainRouter)


app.use(express.static(path.join(__dirname,'/client/dist')))
app.use('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
})


export default app