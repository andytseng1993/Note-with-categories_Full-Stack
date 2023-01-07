import { PrismaClient } from '@prisma/client'
import express from 'express'
import dotenv from 'dotenv'
import notes from './routes/api/notes'
dotenv.config()
const app = express()
const port = process.env.PORT || 3000
const prisma = new PrismaClient()
app.use(express.json())
app.use('/api/notes', notes)


app.listen(port,()=>console.log(`Sever started on port ${port}`))