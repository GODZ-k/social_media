dotenv.config({})

import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import mainRouter from './routes/main.route.js'
import { Resend } from "resend"
const app = express()
export const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended:false}))

app.use(cookieParser())



app.use('/api/v1' , mainRouter)



export default app