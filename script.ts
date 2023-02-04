import { PrismaClient } from '@prisma/client'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import notes from './routes/api/notes'
import categories from './routes/api/categories'
import users from './routes/api/users'
import tags from './routes/api/tags'
import auth from './routes/api/auth'
import path from 'path'


dotenv.config()
const app = express()
const port = process.env.PORT || 3000
const prisma = new PrismaClient()
app.use(express.json())
app.use(cookieParser())

app.use('/api/notes', notes)
app.use('/api/categories', categories)
app.use('/api/tags', tags)
app.use('/api/users',users)
app.use('/api/auth',auth)

app.use(express.static(path.join(__dirname,'./client/dist')))    
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./client/dist/index.html'))
})

app.listen(port,()=>console.log(`Sever started on port ${port}`))



// async function main() {
//     // Connect the client
//     await prisma.$connect()
//     //... you will write your Prisma Client queries here
//     const note =await prisma.note.deleteMany()
//     console.log(note);
    
// }
    
// main()
//     .then(async () => {
//     await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
// })